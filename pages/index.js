import useSWR from "swr";
import { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "../libs/fetch";
import { usePrevious } from "../libs/hooks";

export default function Home() {
	const [added, setAdded] = useState(false);
	const [error, setError] = useState("");
	const [platform, setPlatform] = useState("");
	const prevPlatform = usePrevious(platform);

	async function submitProposal(elm) {
		if (!platform) {
			setError("Le nom de la plateforme est requis");
			return;
		}
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
			setPlatform("");
		}

		console.log(result.tableData);
	}
	useEffect(() => {
		setAdded(false);
	}, [error]);

	return (
		<>
			<Head>
				
				<title>FindReferrer platform proposal</title>
			</Head>
			<main>
				<div className="flex flex-col items-center justify-center h-full max-w-screen-lg px-4 mx-auto mt-32 md:mt-48 lg:px-0">
					<h1 className="mb-4 text-3xl font-bold leading-8 md:text-5xl text-cool-gray-800">
						<span className="text-pinky">findReferrer</span> platforms proposal
					</h1>
					<p className="md:text-center md:w-1/2 text-cool-gray-600">
						Bienvenue sur l'interface qui vous permet de proposer une plateforme à intégrer dans le service
						findReferrer.
					</p>
					<form className="w-full max-w-md p-6 mt-12 bg-white rounded-md shadow sm:overflow-hidden">
						<div className="w-full">
							<label htmlFor="platform_name" className="block text-sm font-medium text-gray-700">
								Platform name
							</label>
							<input
								type="text"
								name="platform_name"
								id="platform_name"
								required
								aria-required
								onChange={(e) => {
									setError("");
									setPlatform(e.target.value);
								}}
								value={platform}
								className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<div className="flex items-baseline justify-between mt-3">
							<span className={added ? "text-green-800" : "text-red-800"}>
								{added ? "'" + prevPlatform + "' " + "Succefully proposed " : error}
							</span>
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
			</main>
			<footer className="fixed bottom-0 w-full px-4 py-2 font-medium text-gray-800 bg-blue-50">squale.agency</footer>
		</>
	);
}
