// scripts/import-guests.mjs
// Usage: node scripts/import-guests.mjs path/to/guests.csv
// CSV headers: full_name,association,allow_plus_one,plus_one_max

import { loadEnvConfig } from '@next/env'      // load .env.local like Next.js
loadEnvConfig(process.cwd())                   // ensures POSTGRES_URL is present (local)
import fs from 'node:fs'
import { parse } from 'csv-parse'
import { insertGuestWithCode } from '../lib/inviteCode.ts'   // ✅ no .js extension
import { sql } from '@vercel/postgres'

// (rest of script unchanged)

async function main(file: string) {
  if (!file) throw new Error('Usage: npx ts-node scripts/import-guests.ts <path/to/guests.csv>')

  const stream = fs.createReadStream(file).pipe(parse({ columns: true, trim: true }))
  let n = 0

  for await (const row of stream) {
    const full_name = String(row.full_name || '').trim()
    if (!full_name) continue

    const association = row.association ? String(row.association).trim() : null
    const allow_plus_one = String(row.allow_plus_one || '').toLowerCase() === 'true'
    const plus_one_max = row.plus_one_max ? Number(row.plus_one_max) : (allow_plus_one ? 1 : 0)

    const code = await insertGuestWithCode({ full_name, association, allow_plus_one, plus_one_max })
    n++
    console.log(`${n}. ${full_name}  →  code: ${code}`)
  }

  const total = await sql`select count(*) from guests`
  console.log('Imported guests:', total.rows[0].count)
}

main(process.argv[2]).catch((e) => { console.error(e); process.exit(1) })