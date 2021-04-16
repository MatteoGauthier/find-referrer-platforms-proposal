import useSWR from "swr";
import { useState } from "react";
import fetch from "../libs/fetch";

export default function Home() {
	const [added, setAdded] = useState(false);
	const [error, setError] = useState("");
	const [platform, setPlatform] = useState(false);
	async function submitProposal(elm) {
		const [tableData, status] = await fetch("/api/addPlatform", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				input: platform,
			}),
		});
		const result = { tableData: await tableData, status: await status };

		if (result.status !== 200) {
			if (result.status == 409) {
				setError(result.tableData.message);
			} else {
				setError("Internal error contact admin");
			}
		} else {
			setAdded(true);
		}

		console.log(result.tableData);
	}
	return (
		<div className="bg-cool-gray-50">
			<div className="flex flex-col items-center justify-center h-screen max-w-screen-lg mx-auto">
				<h1 className="mb-4 text-5xl font-bold text-cool-gray-800">
					<span className="text-pinky">findReferrer</span>{" "}
					platforms proposal
				</h1>
				<p className="w-1/2 text-center text-cool-gray-600">
					Bienvenue sur l'interface qui vous permet de proposer une plateforme à intégrer dans le service findReferrer.
				</p>
				<form className="w-full max-w-md p-6 mt-12 bg-white shadow sm:rounded-md sm:overflow-hidden">
					<div className="w-full">
						<label htmlFor="platform_name" className="block text-sm font-medium text-gray-700">
							Platform name
						</label>
						<input
							type="text"
							name="platform_name"
							id="platform_name"
							onChange={(e) => {
								setError("");
								setPlatform(e.target.value);
							}}
							className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="flex items-baseline justify-between mt-3">
						<span className={added ?   "text-green-800" : "text-red-800"}>{added ? "Succefully proposed " : error}</span>
						<button
							type="submit"
							className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={(e) => {
								e.preventDefault();
								submitProposal();
							}}
						>
							Proposer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
