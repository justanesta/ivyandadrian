// scripts/export-rsvp-links.ts
// Usage: npx tsx scripts/export-rsvp-links.ts > rsvp-links.csv
// Outputs CSV: full_name,invite_code,link

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { sql } from '@vercel/postgres'

const BASE = process.env.LINK_BASE || 'https://your-vercel-domain.vercel.app' 
// ^ set LINK_BASE in .env.local to 'https://ivyandadrian.love' when ready

function csvEscape(s: string) {
  const t = s.replace(/"/g, '""')
  return `"${t}"`
}

async function main() {
  const { rows } = await sql<{ full_name: string; invite_code: string }>`
    select full_name, invite_code from guests order by full_name
  `
  console.log('full_name,invite_code,link')
  for (const r of rows) {
    const link = `${BASE}/rsvp/${r.invite_code}`
    console.log([csvEscape(r.full_name), r.invite_code, csvEscape(link)].join(','))
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
