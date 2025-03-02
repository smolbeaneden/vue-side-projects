import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL, // import.meta.env :  when the application runs, will hold all variables we pass to the app
	import.meta.env.VITE_SUPABASE_KEY,  // VITE allows it to be exposed to the client

)
