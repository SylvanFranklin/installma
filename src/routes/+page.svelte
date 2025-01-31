<script>
    import { createHighlighter } from "shiki";
    import { lazy, packer, pckr, plug, vundle, paq } from "$lib";
    let copy_button;
    let selected_pms = $state([
        "Lazy",
        "Packer",
        "Pckr",
        "Paq",
        "Plug",
        "Vundle",
    ]);
    let branch = $state("");
    let tag = $state("");
    let all_pms = $state(["Lazy", "Packer", "Pckr", "Paq", "Plug", "Vundle"]);
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
    class="flex flex-row w-screen h-screen font-mono justify-center text-sm gap-3 p-3"
>
    <span
        class="flex flex-col w-full gap-3 rounded-sm p-3 bg-black text-white overflow-scroll"
    >
        <form onsubmit={handleSubmit} class="flex flex-col gap-2 text-left">
            <h1>repo name / url</h1>
            <!-- svelte-ignore a11y_autofocus -->
            <input
                autofocus
                class="outline-none bg-slate-800 rounded-sm text-white p-2 w-full text-sm"
                type="text"
                bind:value={url}
            />
            <h2 class="">branch</h2>
            <input
                class="outline-none bg-slate-800 text-white p-2 rounded-sm w-full text-sm"
                type="text"
                bind:value={branch}
            />
            <h2 class="">tag</h2>
            <input
                class="outline-none bg-slate-800 rounded-sm text-white p-2 text-sm"
                type="text"
                bind:value={tag}
            />
            <h2 class="mt-10">package managers</h2>
            <span class="flex flex-col items-start bg-slate-800 p-2 rounded-sm">
                {#each all_pms as pm}
                    <label>
                        <input
                            class="outline-none bg-black rounded-sm text-white px-2"
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
        class="w-full bg-black text-white text-xs rounded-sm p-3 overflow-scroll flex flex-col gap-3 disable-scrollbars"
    >
        <nav
            class="-pt-3 pb-2 bg-black w-full flex flex-row gap-4 items-center"
        >
            <h1 class="text-lg">## Installation</h1>
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
            ...
        {:then hl}
            {#each selected_pms as pm}
                with {pm}
                {#if pm == "Lazy"}
                    {@render code(lazy(url, branch, tag), hl)}
                {:else if pm == "Packer"}
                    {@render code(packer(url, branch, tag), hl)}
                {:else if pm == "Paq"}
                    {@render code(paq(url, branch), hl)}
                {:else if pm == "Plug"}
                    {@render code(plug(url, branch, tag), hl)}
                {:else if pm == "Vundle"}
                    {@render code(vundle(url, branch, tag), hl)}
                {:else if pm == "Pckr"}
                    {@render code(pckr(url, branch, tag), hl)}
                {/if}
            {/each}
        {/await}
    </div>
</main>

{#snippet code(text, hl)}
    {@html hl.codeToHtml(text, { lang: "lua", theme: "github-dark" })}
{/snippet}

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
