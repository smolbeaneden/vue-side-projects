/* eslint-env node */
//telling it where it will run


import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
	process.env.VITE_SUPABASE_URL, // process.env :  when the application runs, will hold all variables we pass to the app. VITE allows it to be exposed to the client
	process.env.SERVICE_ROLE_KEY
)


const seedProjects = async () => {

	const name = faker.lorem.words(3);

	await supabase.from("projects").insert({
		name: name,
		slug: faker.helpers.slugify(name),
		status: faker.helpers.arrayElement(['in-progress', 'completed']),
		collaborators: faker.helpers.arrayElement([1, 2, 3])
	})

}

await seedProjects();
