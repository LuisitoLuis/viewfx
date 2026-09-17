/**
 * Markdown documents for AI agents that fetch the website.
 * Generated at build time as static .md endpoints.
 */
import pkg from '../../../package.json'
import { SITE } from '../data/site.js'
import { EFFECTS } from '../data/effects.js'
import {
  ANIMATION_DELAY,
  ANIMATION_DURATION,
  ANIMATION_STEPS
} from '../data/timing.js'

const NPM = 'https://www.npmjs.com/package/viewfx'
const effects = EFFECTS.map((effect) => effect.id)
const durations = Object.keys(ANIMATION_DURATION)
const delays = Object.keys(ANIMATION_DELAY)
const steps = Object.keys(ANIMATION_STEPS)

const mdHeaders = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'public, max-age=3600'
}

export function markdownResponse(body) {
  return new Response(body, { headers: mdHeaders })
}

export function buildHomeMarkdown() {
  return `# ViewFX

> Theme transition utilities for **Tailwind CSS v3/v4**. Package \`viewfx@${pkg.version}\`. MIT licensed.

This document is the **agent-readable** version of the homepage.
Human UI: ${SITE.url}/ · Markdown: ${SITE.url}/index.md · Full catalog: ${SITE.url}/llms-full.md

## Quick links

| Resource | URL |
|----------|-----|
| Website | ${SITE.url}/ |
| Playground | ${SITE.url}/playground/ |
| Playground (markdown) | ${SITE.url}/playground.md |
| npm | ${NPM} |
| GitHub | ${SITE.repo} |
| llms.txt | ${SITE.url}/llms.txt |
| Full agent doc | ${SITE.url}/llms-full.md |

## Install

\`\`\`bash
npm install viewfx
# or: pnpm add viewfx
\`\`\`

\`\`\`css
@import "tailwindcss";
@import "viewfx";
\`\`\`

**Tailwind v3:** \`plugins: [require('viewfx')]\` in \`tailwind.config.js\`.

## Usage

Put one effect class and \`.dark\` on \`<html>\`, then wrap theme toggles in \`document.startViewTransition\`.

\`\`\`html
<html class="dark polygon">
<html class="dark circle-duration-1000-delay-300">
<html class="dark fade fx-duration-1000 fx-delay-300 fx-steps-modern">
\`\`\`

## Site sections (HTML)

- \`#install-command\` — install snippet
- \`#palette\` — gallery of all effects (hover preview, click copy)
- \`#faq\` — FAQ
- Playground CTA → \`${SITE.url}/playground/\`

## Effect catalog (${effects.length})

${effects.map((name) => `- \`${name}\``).join('\n')}

## Timing modifiers

### Duration (\`fx-duration-*\` or \`{effect}-duration-*\`)
${durations.map((k) => `\`${k}\``).join(', ')}

### Delay (\`fx-delay-*\` or \`{effect}-delay-*\`)
${delays.map((k) => `\`${k}\``).join(', ')}

### Steps (\`fx-steps-*\`)
${steps.map((k) => `\`${k}\``).join(', ')}

## Playground URL state

\`${SITE.url}/playground/?e=polygon&d=1000&delay=0&s=none\`

| Param | Meaning |
|-------|---------|
| \`e\` | effect id |
| \`d\` | duration key |
| \`delay\` | delay key |
| \`s\` | steps key |

## For AI agents

- Prefer markdown endpoints (\`/index.md\`, \`/playground.md\`, \`/llms-full.md\`) over scraping HTML.
- Source of truth for CSS: \`${SITE.repo}/blob/main/src/index.css\`

---
Generated from \`viewfx@${pkg.version}\` · ${SITE.url}
`
}

export function buildPlaygroundMarkdown() {
  return `# ViewFX — Playground

> Live composition sandbox for \`viewfx\` theme transitions.

HTML UI: ${SITE.url}/playground/
This markdown: ${SITE.url}/playground.md
Home (markdown): ${SITE.url}/index.md

## What you can do

1. Pick an effect from ${effects.length} utilities
2. Tune duration, delay, and steps
3. Play the wipe on the real View Transitions API
4. Copy the class list
5. Share the URL (query params encode state)

## Available effects

${effects.map((name) => `- \`${name}\``).join('\n')}

## Controls

| Control | Class pattern | Keys |
|---------|---------------|------|
| Duration | \`fx-duration-{key}\` | ${durations.join(', ')} |
| Delay | \`fx-delay-{key}\` | ${delays.join(', ')} |
| Steps | \`fx-steps-{key}\` | ${steps.join(', ')} |

## Related

- Package install + full docs: ${SITE.url}/index.md
- Full agent reference: ${SITE.url}/llms-full.md
- Source: ${SITE.repo}

---
Generated from \`viewfx@${pkg.version}\`
`
}

export function buildLlmsFullMarkdown() {
  return `# viewfx — full agent reference

Package: \`viewfx@${pkg.version}\`
npm: ${NPM}
Repo: ${SITE.repo}
Site: ${SITE.url}
License: MIT

## What it is

A Tailwind CSS plugin of **${effects.length} dark/light theme transitions** on the native View Transitions API. Put one effect class on \`<html>\` and wrap the theme toggle in \`document.startViewTransition\`.

\`\`\`css
@import "tailwindcss";
@import "viewfx";
\`\`\`

## Website map for agents

| Path | Purpose |
|------|---------|
| \`/\` | Marketing + live demos |
| \`/index.md\` | Home as Markdown |
| \`/playground/\` | Interactive class composer |
| \`/playground.md\` | Playground as Markdown |
| \`/llms.txt\` | Short LLM summary |
| \`/llms-full.md\` | This full reference |

## Effect names

Prefix is the class itself (no \`animate-\`).

${effects.map((n) => `- \`${n}\``).join('\n')}

---
End of agent reference · viewfx@${pkg.version}
`
}
