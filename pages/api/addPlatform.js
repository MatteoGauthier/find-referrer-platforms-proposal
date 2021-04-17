import { getTable, addElment } from "../../libs/airtable";
module.exports = async (req, res) => {
	const { input } = req.body;
	if (input) {
		const table = await getTable();
		const exist =
			(
				await table.records.filter((elm) => {
					return elm.fields.Name.toUpperCase() === input.toUpperCase();
				})
			).length !== 0;

		if (exist) {
			res.status(409).json({
				message: `'${input}' already exist`,
			});
		} else {
			(await addElment(input))
				? res.status(200).json({
						message: "platform added",
				  })
				: res.status(500).json({
						message: "internal error",
				  });
		}
	} else {
		res.status(400).json({
			type: "error",
			message: "missing 'input' in body",
		});
	}
};
