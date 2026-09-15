import type { VercelRequest, VercelResponse } from '@vercel/node'

type Action = 'summarize' | 'autotag' | 'link'
type Body = {
  action: Action
  title?: string
  body?: string
  tags?: string[]
  catalog?: { id: string; title: string; body: string; tags: string[] }[]
}

type Provider = { name: string; base: string; key: string; model: string }

function providers(): Provider[] {
  const shared = (process.env.BUILD_GAMES_LLM_API_KEY || '').trim()
  const xai = (process.env.XAI_API_KEY || process.env.GROK_API_KEY || (shared.startsWith('xai-') ? shared : '')).trim()
  const openai = (process.env.OPENAI_API_KEY || (!shared.startsWith('xai-') ? shared : '')).trim()
  const gateway = (process.env.AI_GATEWAY_API_KEY || shared).trim()
  const out: Provider[] = []
  const seen = new Set<string>()
  const push = (p: Provider) => {
    const id = `${p.name}|${p.base}|${p.model}`
    if (!p.key || seen.has(id)) return
    seen.add(id)
    out.push(p)
  }
  if (xai) {
    push({
      name: 'xai',
      base: (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, ''),
      key: xai,
      model: process.env.AI_MODEL || process.env.XAI_MODEL || 'grok-2-latest',
    })
  }
  if (openai) {
    push({
      name: 'openai',
      base: (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, ''),
      key: openai,
      model: process.env.AI_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
    })
  }
  if (gateway) {
    push({
      name: 'vercel-ai-gateway',
      base: (process.env.AI_GATEWAY_BASE_URL || 'https://ai-gateway.vercel.sh/v1').replace(/\/$/, ''),
      key: gateway,
      model: process.env.AI_MODEL || process.env.AI_GATEWAY_MODEL || 'openai/gpt-4o-mini',
    })
  }
  // Last resort: shared against xAI even if prefix unknown (per sibling youform pattern)
  if (shared) {
    push({
      name: 'xai-shared',
      base: 'https://api.x.ai/v1',
      key: shared,
      model: process.env.AI_MODEL || process.env.XAI_MODEL || 'grok-2-latest',
    })
  }
  return out
}

async function chat(system: string, user: string) {
  const list = providers()
  if (!list.length) return null
  let lastErr = 'no provider'
  for (const p of list) {
    try {
      const res = await fetch(`${p.base}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${p.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: p.model,
          temperature: 0.3,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
          response_format: { type: 'json_object' },
        }),
      })
      if (!res.ok) {
        lastErr = `${p.name} ${res.status}`
        continue
      }
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
      const content = data.choices?.[0]?.message?.content || '{}'
      return { provider: p.name, model: p.model, json: JSON.parse(content) as Record<string, unknown> }
    } catch (e) {
      lastErr = e instanceof Error ? e.message : 'fetch failed'
    }
  }
  throw new Error(lastErr)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Body
  if (!body?.action) return res.status(400).json({ error: 'action required' })

  const title = (body.title || '').trim()
  const text = (body.body || '').trim()
  const catalog = body.catalog || []

  try {
    if (!providers().length) {
      return res.status(200).json({ mode: 'unavailable', reason: 'no_api_key' })
    }
    if (body.action === 'summarize') {
      const out = await chat(
        'You tighten notecards. Return JSON {"summary":"..."} — 1–2 dense sentences, no fluff, preserve key nouns.',
        `Title: ${title}\n\n${text}`,
      )
      if (!out) return res.status(200).json({ mode: 'unavailable', reason: 'no_api_key' })
      return res.status(200).json({
        mode: 'llm',
        provider: out.provider,
        model: out.model,
        summary: String(out.json.summary || ''),
      })
    }
    if (body.action === 'autotag') {
      const out = await chat(
        'Propose 3–6 short lowercase tags for a notecard. Return JSON {"tags":["..."]}. Prefer existing vocabulary when listed.',
        `Existing tags in desk: ${(body.tags || []).join(', ') || '(none)'}\nTitle: ${title}\n\n${text}`,
      )
      if (!out) return res.status(200).json({ mode: 'unavailable', reason: 'no_api_key' })
      const tags = Array.isArray(out.json.tags) ? out.json.tags.map(String) : []
      return res.status(200).json({ mode: 'llm', provider: out.provider, model: out.model, tags })
    }
    if (body.action === 'link') {
      const list = catalog
        .slice(0, 40)
        .map((c, i) => `${i + 1}. [${c.id}] ${c.title} — ${c.body.slice(0, 120).replace(/\n/g, ' ')}`)
        .join('\n')
      const out = await chat(
        'Suggest up to 4 other notecards to [[wiki-link]] from the current card. Return JSON {"links":[{"id":"...","title":"...","reason":"..."}]} using only catalog ids.',
        `Current title: ${title}\nCurrent body:\n${text}\n\nCatalog:\n${list || '(empty)'}`,
      )
      if (!out) return res.status(200).json({ mode: 'unavailable', reason: 'no_api_key' })
      const links = Array.isArray(out.json.links) ? out.json.links : []
      return res.status(200).json({ mode: 'llm', provider: out.provider, model: out.model, links })
    }
    return res.status(400).json({ error: 'unknown action' })
  } catch (err) {
    // Upstream keys may be rejected; client falls back to local craft.
    return res.status(200).json({
      mode: 'unavailable',
      reason: 'upstream_rejected',
      error: err instanceof Error ? err.message : 'ai failed',
    })
  }
}
