<script>
	import { templates, all_pms, pm_link, parse_options } from "$lib";
	import Builder from "../components/builder.svelte";
	import Previewer from "../components/previewer.svelte";

	let {
		selected_pms = $bindable(),
		url = $bindable(),
		branch = $bindable(),
		tag = $bindable(),
		options = $bindable(),
		lazy = $bindable(),
		links = $bindable(),
		preview,
	} = $props();

	let pms = $state(all_pms);

	function handleSubmit(e) {
		e.preventDefault();
	}
</script>

<section
	class={[
		"w-screen lg:w-full bg-gray-950 text-white flex-grow flex-shrink-0 py-4 px-3 lg:flex-shrink",
		preview && "-translate-x-full lg:translate-x-0",
	]}
>
	<h1 class="font-bold text-xl mb-2">Installma</h1>
	<p>
		Generate installation instructions for neovim plugins while enforcing best
		practices for plugin compatibility and simplicity. You can help out with a
		star on
		<a
			href="https://github.com/SylvanFranklin/installma"
			class="bg-linear-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
		>
			github
		</a>.
	</p>

	<label class="flex flex-col gap-3 mt-4">
		<div class="flex gap-2 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 16 16"
			>
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
					clip-rule="evenodd"
				/>
			</svg>
			<span>repo name / url</span>
		</div>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			autofocus
			class="outline-hidden bg-slate-800/50 rounded text-white py-2 px-3 w-full"
			type="text"
			bind:value={url}
		/>
	</label>

	<label class="flex flex-col gap-3 mt-4">
		<div class="flex gap-2 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 16 16"
			>
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M11.5 4.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m2.5-1a2.5 2.5 0 0 1-1.872 2.42A3.5 3.5 0 0 1 8.75 8.5h-1.5a2 2 0 0 0-1.965 1.626a2.501 2.501 0 1 1-1.535-.011v-4.23a2.501 2.501 0 1 1 1.5 0v1.742a3.5 3.5 0 0 1 2-.627h1.5a2 2 0 0 0 1.823-1.177A2.5 2.5 0 1 1 14 3.5m-8.5 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-9a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
					clip-rule="evenodd"
				/>
			</svg>
			<span>branch</span>
		</div>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			autofocus
			class="outline-hidden bg-slate-800/50 rounded text-white py-2 px-3 w-full"
			type="text"
			bind:value={branch}
		/>
	</label>

	<label class="flex flex-col gap-3 mt-4">
		<div class="flex gap-2 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 16 16"
			>
				<path
					fill="currentColor"
					d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"
				/>
			</svg>
			<span>options</span>
		</div>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			autofocus
			class="outline-hidden bg-slate-800/50 rounded text-white py-2 px-3 w-full"
			type="text"
			bind:value={options}
		/>
	</label>

	<label class="flex flex-col gap-3 mt-4">
		<div class="flex gap-2 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 16 16"
			>
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M9.664 1a1.75 1.75 0 0 0-1.237.512L1.514 8.419a1.75 1.75 0 0 0-.001 2.475L5.1 14.48a1.75 1.75 0 0 0 2.474 0l6.914-6.906A1.75 1.75 0 0 0 15 6.335V1zm-.177 1.573a.25.25 0 0 1 .177-.073H13.5v3.835a.25.25 0 0 1-.073.177L6.513 13.42a.25.25 0 0 1-.353 0L2.574 9.833a.25.25 0 0 1 0-.353zM11 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
					clip-rule="evenodd"
				/>
			</svg>
			<span>tag</span>
		</div>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			autofocus
			class="outline-hidden bg-slate-800/50 rounded text-white py-2 px-3 w-full"
			type="text"
			bind:value={tag}
		/>
	</label>

	<h3 class="mt-4 mb-2">Package managers</h3>
	<fieldset aria-label="Select a package manager">
		<div class="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
			{#each pms as pm}
				<label
					class="bg-slate-800 text-white flex cursor-pointer items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase focus:outline-hidden sm:flex-1 has-checked:ring-2 has-checked:ring-slate-400 has-checked:bg-slate-700 has-checked:text-white"
				>
					<input
						type="checkbox"
						name="package-manager"
						value={pm}
						bind:group={selected_pms}
						class="sr-only"
					/>
					<span>{pm}</span>
				</label>
			{/each}
		</div>
	</fieldset>

	<h3 class="mt-4 mb-2">Settings</h3>
	<fieldset aria-label="Settings">
		<div class="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
			<label
				class="bg-slate-800 text-white flex cursor-pointer items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase focus:outline-hidden sm:flex-1 has-checked:ring-2 has-checked:ring-slate-400 has-checked:bg-slate-700 has-checked:text-white"
			>
				<input
					type="checkbox"
					name="links"
					value="links"
					bind:checked={links}
					class="sr-only"
				/>
				<span>links</span>
			</label>

			<label
				class="bg-slate-800 text-white flex cursor-pointer items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase focus:outline-hidden sm:flex-1 has-checked:ring-2 has-checked:ring-slate-400 has-checked:bg-slate-700 has-checked:text-white"
			>
				<input
					type="checkbox"
					name="links"
					value="lazy"
					bind:checked={lazy}
					class="sr-only"
				/>
				<span>lazy</span>
			</label>
		</div>
	</fieldset>
</section>
