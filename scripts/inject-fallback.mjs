import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const dist = resolve(root, 'dist')
const SITE = 'https://tristan-portfolio-v1.vercel.app'

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`

function buildFallback(data, { withAi }) {
  const { profile, contact, experience, projects, skillGroups, softSkills, education, languages, ai } = data

  return `
    <div class="static-fallback" id="static-fallback">
      <main>
        <header>
          <h1>${esc(profile.name)} — ${esc(profile.role)}</h1>
          <p class="fb-meta">${esc(profile.heroLine)} — ${esc(contact.location)}</p>
          <p>${esc(profile.tagline)}</p>
          <p>${esc(profile.summary)}</p>
          <p class="fb-meta">
            Email: <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
            · Phone: ${esc(contact.phone)}
            · <a href="${esc(contact.github)}">GitHub</a>${contact.linkedin
              ? ` · <a href="${esc(contact.linkedin)}">LinkedIn</a>`
              : ''}
            · <a href="${esc(contact.website)}">Website</a>
            · <a href="${esc(contact.resume)}">Resume (PDF)</a>
          </p>
        </header>
        <section>
          <h2>Skills</h2>
          ${skillGroups.map((g) => `<h3>${esc(g.title)}</h3>${list(g.skills)}`).join('')}
          <h3>Soft Skills</h3>
          ${list(softSkills)}
        </section>
        ${
          withAi && ai
            ? `<section>
          <h2>AI Learning</h2>
          <p>${esc(ai.statement)}</p>
          <ul>${ai.items.map((i) => `<li>${esc(i.name)} — ${esc(i.status)}</li>`).join('')}</ul>
        </section>`
            : ''
        }
        <section>
          <h2>Experience</h2>
          ${experience
            .map(
              (e) => `
            <h3>${esc(e.title)} — ${esc(e.company)}</h3>
            <p class="fb-meta">${esc(e.period)} · ${esc(e.type)} · ${esc(e.place)}</p>
            ${e.stack ? `<p class="fb-tags">Stack: ${esc(e.stack.join(', '))}</p>` : ''}
            ${list(e.bullets)}`
            )
            .join('')}
        </section>
        <section>
          <h2>Projects</h2>
          ${projects
            .map(
              (p) => `
            <h3>${esc(p.name)}${p.url ? ` — <a href="${esc(p.url)}">${esc(p.url)}</a>` : ''}</h3>
            <p class="fb-meta">${esc(p.period)}${p.tools?.length ? ` · ${esc(p.tools.join(' · '))}` : ''}</p>
            <p>${esc(p.description)}</p>
            ${p.bullets ? list(p.bullets) : ''}`
            )
            .join('')}
        </section>
        <section>
          <h2>Education</h2>
          ${education
            .map(
              (e) => `
            <h3>${esc(e.degree)} — ${esc(e.school)}</h3>
            <p class="fb-meta">${esc(e.period)} · ${esc(e.place)}</p>`
            )
            .join('')}
        </section>
        <section>
          <h2>Languages</h2>
          ${list(languages)}
        </section>
        <section>
          <h2>Contact</h2>
          <ul>
            <li>Email: <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>
            <li>Phone: ${esc(contact.phone)}</li>
            <li>Location: ${esc(contact.location)}</li>
            <li>GitHub: <a href="${esc(contact.github)}">${esc(contact.githubLabel)}</a></li>
            ${contact.linkedin ? `<li>LinkedIn: <a href="${esc(contact.linkedin)}">${esc(contact.linkedinLabel)}</a></li>` : ''}
            <li>Website: <a href="${esc(contact.website)}">${esc(contact.websiteLabel)}</a></li>
          </ul>
        </section>
      </main>
    </div>`
}

function injectHead(html, { title, canonical }) {
  let out = html
  if (title) out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)

  const canonTag = `<link rel="canonical" href="${canonical}" />`
  out = /<link rel="canonical"[^>]*>/.test(out)
    ? out.replace(/<link rel="canonical"[^>]*>/, canonTag)
    : out.replace('</head>', `    ${canonTag}\n  </head>`)

  out = /<meta property="og:url" content="[^"]*"\s*\/?>/.test(out)
    ? out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    : out.replace('</head>', `    <meta property="og:url" content="${canonical}" />\n  </head>`)

  return out
}

function injectFallback(html, fallbackHtml) {
  const marker = '<div id="root"></div>'
  if (!html.includes(marker)) {
    throw new Error(`marker ${marker} not found in dist/index.html — update scripts/inject-fallback.mjs`)
  }
  return html.replace(marker, `<div id="root">${fallbackHtml}</div>`)
}

const v1 = await import(pathToFileURL(resolve(root, 'src/data/resume.js')).href)
const v2 = await import(pathToFileURL(resolve(root, 'src/data/resumeV2.js')).href)

const base = readFileSync(resolve(dist, 'index.html'), 'utf8')

const routes = [
  { out: 'index.html', canonical: `${SITE}/`, title: null, data: v2, withAi: true },
  { out: 'v1/index.html', canonical: `${SITE}/v1`, title: 'Tristan Vegas — Web Developer Portfolio (V1)', data: v1, withAi: false },
  { out: 'v2/index.html', canonical: `${SITE}/v2`, title: 'Tristan Vegas — Web Developer Portfolio (V2)', data: v2, withAi: true },
]

for (const route of routes) {
  const fallback = buildFallback(route.data, { withAi: route.withAi })
  let html = injectFallback(base, fallback)
  html = injectHead(html, { title: route.title, canonical: route.canonical })

  const target = resolve(dist, route.out)
  mkdirSync(resolve(target, '..'), { recursive: true })
  writeFileSync(target, html)
  console.log(`[inject-fallback] wrote dist/${route.out} (${html.length} bytes)`)
}
