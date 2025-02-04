<script>
    import { templates, all_pms, pm_link } from "$lib";
    import { createHighlighter } from "shiki";
    import { slide } from "svelte/transition";
    let links = $state(true);
    let copy_button;
    let pms = $state(all_pms);
    let selected_pms = $state(["Lazy", "Mini", "Rocks toml", "Rocks command"]);
    let branch = $state("");
    let tag = $state("");
    let url = $state("github.com/sylvanfranklin/omnipreview");
    let hl = $state(
        createHighlighter({
            themes: ["github-dark"],
            langs: ["markdown", "lua", "toml"],
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
            <h1 class="flex flex-row items-center gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    ><path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
                        clip-rule="evenodd"
                    /></svg
                >
                repo name / url
            </h1>
            <!-- svelte-ignore a11y_autofocus -->
            <input
                autofocus
                class="outline-none bg-slate-800/50 rounded-sm text-white p-2 w-full"
                type="text"
                bind:value={url}
            />
            <h2 class="flex flex-row gap-3 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    ><path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M11.5 4.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m2.5-1a2.5 2.5 0 0 1-1.872 2.42A3.5 3.5 0 0 1 8.75 8.5h-1.5a2 2 0 0 0-1.965 1.626a2.501 2.501 0 1 1-1.535-.011v-4.23a2.501 2.501 0 1 1 1.5 0v1.742a3.5 3.5 0 0 1 2-.627h1.5a2 2 0 0 0 1.823-1.177A2.5 2.5 0 1 1 14 3.5m-8.5 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-9a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                        clip-rule="evenodd"
                    /></svg
                >
                branch
            </h2>
            <input
                class="outline-none bg-slate-800/50 text-white p-2 rounded-sm w-full"
                type="text"
                bind:value={branch}
            />
            <h2 class="flex flex-row gap-3 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    ><path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M9.664 1a1.75 1.75 0 0 0-1.237.512L1.514 8.419a1.75 1.75 0 0 0-.001 2.475L5.1 14.48a1.75 1.75 0 0 0 2.474 0l6.914-6.906A1.75 1.75 0 0 0 15 6.335V1zm-.177 1.573a.25.25 0 0 1 .177-.073H13.5v3.835a.25.25 0 0 1-.073.177L6.513 13.42a.25.25 0 0 1-.353 0L2.574 9.833a.25.25 0 0 1 0-.353zM11 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                        clip-rule="evenodd"
                    /></svg
                >tag
            </h2>
            <input
                class="outline-none bg-slate-800/50 rounded-sm text-white p-2"
                type="text"
                bind:value={tag}
            />

            <h2 class="">package managers</h2>
            <span
                class="grid grid-col grid-flow-row grid-cols-3 items-start bg-slate-800/50 p-2 rounded-sm"
            >
                {#each pms as pm}
                    <label>
                        <input
                            class="outline-none rounded-md text-white px-2 p-4"
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
            <h2 class="flex flex-row gap-3 items-center">settings</h2>
            <span
                class="flex flex-col items-start bg-slate-800/50 p-2 rounded-sm"
            >
                <label class="Links">
                    <input class="" type="checkbox" bind:checked={links} />
                    links
                </label>
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
            {#each selected_pms as pm, index (pm)}
                <span animate:flip={{ duration: 400 }}>
                    <h2 class="mb-2">
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
                        ),
                        {
                            lang: pm.toLowerCase().includes("toml")
                                ? "toml"
                                : "lua",
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
