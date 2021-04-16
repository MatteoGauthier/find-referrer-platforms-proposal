export async function getTable() {
	const data = await fetch(`https://api.airtable.com/v0/appw0yL0vU204TgOC/main`, {
		headers: {
			Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
		},
	});
	return await data.json();
}
export async function addElment(name) {
	const data = await fetch(`https://api.airtable.com/v0/appw0yL0vU204TgOC/main`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
			"Content-Type": "application/json",
		},

		body: JSON.stringify({
			records: [
				{
					fields: {
						Name: name,
					},
				},
			],
		}),
	});
	const result = await data.json()
	return result;
}
