import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vbfsyqqvcrmffvfxhplk.supabase.co'

const supabaseKey = 'sb_publishable_ygumd1Psu5DfFoPNef9PSg_YncyALHH'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)