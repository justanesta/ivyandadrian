// lib/inviteCode.ts
// Generate short, memorable 4–8 letter codes from a curated list,
// retry on collisions, and insert a guest.

import { sql } from '@/lib/db'

// 200 distinct, neutral words (4–8 letters). Keep them lowercase A–Z.
// (Trim list here for brevity — keep your full 200 list in your repo.)
export const WORDS = [
  'acacia','agave','alder','almond','amber','anther','arbor','aspen','azalea','bamboo',
  'banyan','barley','basil','beech','berry','birch','blossom','breeze','bramble','briar',
  'brome','brook','buckeye','bulbil','cactus','camellia','canopy','caper','cedar','chicory',
  'clover','coral','cotton','crocus','cypress','daisy','daphne','dawn','elmwood','ember',
  'fennel','fern','flower','forest','foxglove','frond','garden','garlic','ginkgo','ginger',
  'glade','glimmer','granite','grove','hazel','heather','hemlock','herbal','hibiscus','holly',
  'honey','hyacinth','iris','jade','jasper','laurel','lavender','leaflet','lemon','lichen',
  'lilac','lily','linden','locust','lotus','magnolia','mallow','mango','maple','marigold',
  'marble','meadow','melon','mimosa','minty','mossy','mulch','mulberry','myrtle','nectar',
  'oakleaf','oakwood','olive','onyx','opal','orchid','osage','osier','pansy','papaya',
  'pastel','peachy','pearl','pebble','pepper','peridot','petal','phlox','pigeon','pine',
  'pistil','plane','plover','plum','pollen','poplar','poppy','posy','prairie','primrose',
  'prunus','quince','raven','redbud','redwood','reed','resin','rhodora','rhubarb','river',
  'robin','rosebud','rosemary','rosette','saffron','sage','salmon','sandal','sapling','scarlet',
  'sedge','sedum','sepia','serene','sesame','shadow','shale','shrub','sierra','silica',
  'silken','silver','slate','smoky','snowcap','snowy','sorrel','sparrow','spice','spiral',
  'sprig','sprout','spruce','starry','stone','stormy','straw','sugar','sunbeam','sunlit',
  'sunrise','sunset','tansy','tarragon','teak','thistle','thyme','tidal','topaz','trillium',
  'truffle','tulip','tundra','turtle','umber','valley','velvet','vernal','violet','vine',
  'walnut','willow','winter','wisteria','yarrow','yonder','zephyr','zinnia'
].filter((w, i, a) => a.indexOf(w) === i) // safety net

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

let availableCodes: string[] | null = null

async function getAvailableCodes(): Promise<string[]> {
  if (availableCodes) return availableCodes

  // 1) fetch used codes (lowercased)
  const usedRes = await sql<{ code: string }>`select lower(invite_code) as code from guests`
  const used = new Set(usedRes.rows.map(r => r.code))

  // 2) build remaining pool (lowercase words only)
  const pool = WORDS.map(w => w.toLowerCase()).filter(w => !used.has(w))

  if (pool.length === 0) {
    throw new Error('No invite codes left in WORDS. Please add more unique words.')
  }

  // 3) shuffle once so imports look “random enough”
  availableCodes = shuffle(pool)
  return availableCodes
}

// Allocate exactly one unused code (no retry loops)
async function allocateCode(): Promise<string> {
  const pool = await getAvailableCodes()
  const code = pool.pop() // remove from end; deterministic no-collision
  if (!code) throw new Error('Invite code pool exhausted. Add more WORDS before continuing.')
  return code
}

export async function insertGuestWithCode(g: {
  full_name: string
  association?: string | null
  allow_plus_one?: boolean
  plus_one_max?: number
}) {
  const code = await allocateCode()
  await sql`
    insert into guests (invite_code, full_name, association, allow_plus_one, plus_one_max)
    values (${code}, ${g.full_name}, ${g.association ?? null}, ${!!g.allow_plus_one}, ${g.plus_one_max ?? 0})
  `
  return code
}
