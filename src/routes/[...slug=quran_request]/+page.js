import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { slug } = params;
	// console.log(`[...slug]/+page.server.js: `, params);

	try {
		const data = await import(`../../lib/content/quran/base.json`);
		const selected = Object.entries(data.default).find(([key, value]) => key === slug);
		// console.log('data', data.default);
		// console.log('selected', selected);

		if (selected === undefined) {
			return error(404, 'Not found');
		}

		return selected[1];
	} catch (e) {
		return error(404, 'Not found');
	}
}
