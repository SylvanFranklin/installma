<script>
	import { flip } from "svelte/animate";
	import { parse_options, pm_link, templates } from "$lib";
	import { createHighlighter } from "shiki";

	let { selected_pms, url, branch, tag, options, lazy, links, preview } =
		$props();

	let copy_button;
	let hl = $state(
		createHighlighter({
			themes: ["github-dark"],
			langs: ["markdown", "lua", "toml"],
		}),
	);

	function copy() {
		copy_button.animate([{ rotate: "360deg" }], {
			duration: 200,
		});

		let text = "## Installation \n";
		for (const pm of selected_pms) {
			text += "\n" + pm;
			text += "\n```lua\n";
			if (pm == "Lazy") text += lazy(url, branch, tag);
			else if (pm == "Packer") text += packer(url, branch, tag);
			else if (pm == "Paq") text += paq(url, branch);
			else if (pm == "Plug") text += plug(url, branch, tag);
			else if (pm == "Vundle") text += vundle(url, branch, tag);
			else if (pm == "Pckr") text += pckr(url, branch, tag);
			text += "\n```\n";
		}

		navigator.clipboard.writeText(text).then(
			function () {
				console.log("Async: Copying to clipboard was successful!");
			},
			function (err) {
				console.error("Async: Could not copy text: ", err);
			},
		);
	}
</script>

<section
	class={[
		"w-screen lg:w-full lg:max-w-1/2 flex-grow flex-shrink-0 lg:flex-shrink text-white p-6 pt-10 disable-scrollbars",
		preview && "-translate-x-full lg:translate-x-0",
	]}
>
	<h3
		class="flex gap-2 items-center text-lg uppercase border-b border-gray-500 pb-1"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="text-white"
			width="1.3em"
			height="1.3em"
			viewBox="0 0 24 24"
		>
			<path
				fill="currentColor"
				d="M0 3.75A.75.75 0 0 1 .75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.5 4.5 0 0 1 15.75 3h7.5a.75.75 0 0 1 .75.75v15.063a.75.75 0 0 1-.755.75l-7.682-.052a3 3 0 0 0-2.142.878l-.89.891a.75.75 0 0 1-1.061 0l-.902-.901a3 3 0 0 0-2.121-.879H.75a.75.75 0 0 1-.75-.75Zm12.75 15.232a4.5 4.5 0 0 1 2.823-.971l6.927.047V4.5h-6.75a3 3 0 0 0-3 3ZM11.247 7.497a3 3 0 0 0-3-2.997H1.5V18h6.947c1.018 0 2.006.346 2.803.98Z"
			/>
		</svg>
		<span>Example Readme</span>

		<button
			type="button"
			bind:this={copy_button}
			onclick={copy}
			aria-label="copy to clipboard"
			class="text-white relative hover:scale-110 ml-auto"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1.5em"
				height="1.5em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z"
				/>
			</svg>
		</button>
	</h3>

	{#await hl}
		loading preview...
	{:then hl}
		<h2 class="text-xl font-bold my-4">Installation</h2>

		{#each selected_pms as pm, index (pm)}
			<span animate:flip={{ duration: 400 }}>
				<h2 class="mb-2 mt-4">
					with
					{#if links}
						<a href={pm_link(pm)} class="text-blue-400">{pm}</a>
					{:else}
						{pm}
					{/if}
				</h2>
				{@html hl.codeToHtml(
					templates[pm.toLowerCase().trim().replace(" ", "")](
						url,
						branch,
						tag,
						parse_options(options),
						lazy,
					),
					{
						lang: pm.toLowerCase().includes("toml") ? "toml" : "lua",
						theme: "github-dark",
					},
				)}
			</span>
		{/each}
	{/await}
</section>

<style>
	.disable-scrollbars::-webkit-scrollbar {
		background: transparent; /* Chrome/Safari/Webkit */
		width: 0px;
	}

	.disable-scrollbars {
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 10+ */
	}
</style>
