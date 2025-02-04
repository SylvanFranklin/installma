<script>
    import { templates, all_pms, pm_link } from "$lib";
    import { createHighlighter } from "shiki";
    import { slide } from "svelte/transition";
    let copy_button;
    let pms = $state(all_pms);
    let selected_pms = $state([
        "Lazy",
        "Mini",
        "Rocks toml",
        "Rocks command",
    ]);
    let branch = $state("");
    let tag = $state("");
    let url = $state("github.com/sylvanfranklin/omnipreview");
    let hl = $state(
        createHighlighter({
            themes: ["github-dark"],
            langs: ["markdown", "lua"],
        }),
    );
    function handleSubmit(e) {
        e.preventDefault();
    }

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

<main
    class="flex flex-row w-screen h-screen font-mono justify-center bg-gray-800"
>
    <span
        class="flex flex-col w-full gap-3 rounded-sm p-8 bg-black text-white overflow-scroll text-lg"
    >
        <form onsubmit={handleSubmit} class="flex flex-col gap-2 text-left">
            <h1>repo name / url</h1>
            <!-- svelte-ignore a11y_autofocus -->
            <input
                autofocus
                class="outline-none bg-slate-800 rounded-sm text-white p-2 w-full"
                type="text"
                bind:value={url}
            />
            <h2 class="">branch</h2>
            <input
                class="outline-none bg-slate-800 text-white p-2 rounded-sm w-full"
                type="text"
                bind:value={branch}
            />
            <h2 class="">tag</h2>
            <input
                class="outline-none bg-slate-800 rounded-sm text-white p-2"
                type="text"
                bind:value={tag}
            />
            <h2 class="mt-10">package managers</h2>
            <span class="flex flex-col items-start bg-slate-800 p-2 rounded-sm">
                {#each pms as pm}
                    <label>
                        <input
                            class="outline-none bg-black rounded-sm text-white px-2"
                            autocomplete="off"
                            type="checkbox"
                            name="package managers"
                            value={pm}
                            bind:group={selected_pms}
                        />
                        {pm}
                    </label>
                {/each}
            </span>
        </form>
    </span>
    <div
        class="w-full bg-black text-white p-6 overflow-scroll flex flex-col gap-3 disable-scrollbars rounded-lg m-4"
    >
        <nav
            class="-pt-3 pb-2 bg-black w-full flex flex-row gap-4 items-center border-b-2 border-white/20 p-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-white"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 24 24"
                ><path
                    fill="currentColor"
                    d="M0 3.75A.75.75 0 0 1 .75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.5 4.5 0 0 1 15.75 3h7.5a.75.75 0 0 1 .75.75v15.063a.75.75 0 0 1-.755.75l-7.682-.052a3 3 0 0 0-2.142.878l-.89.891a.75.75 0 0 1-1.061 0l-.902-.901a3 3 0 0 0-2.121-.879H.75a.75.75 0 0 1-.75-.75Zm12.75 15.232a4.5 4.5 0 0 1 2.823-.971l6.927.047V4.5h-6.75a3 3 0 0 0-3 3ZM11.247 7.497a3 3 0 0 0-3-2.997H1.5V18h6.947c1.018 0 2.006.346 2.803.98Z"
                /></svg
            >

            <h1>EXAMPLE README</h1>
            <button
                type="submit"
                bind:this={copy_button}
                onclick={copy}
                aria-label="copy to clipboard"
                class="text-white relative hover:scale-110 ml-auto"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    ><path
                        fill="currentColor"
                        d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z"
                    /></svg
                >
            </button>
        </nav>
        {#await hl}
            loading preview...
        {:then hl}
            <h1 class="text-2xl font-bold mb-4">Installation</h1>
            {#each selected_pms as pm}
                <span transition:slide>
                    <h2 class="mb-2">
                        with <a href={pm_link(pm)} class="text-blue-400">{pm}</a>
                    </h2>
                    {@html hl.codeToHtml(
                        templates[pm.toLowerCase().trim().replace(" ", "")](url, branch, tag),
                        {
                            lang: "lua",
                            theme: "github-dark",
                        },
                    )}
                </span>
            {/each}
        {/await}
    </div>
</main>

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
