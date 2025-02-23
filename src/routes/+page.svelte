<script>
    import Builder from "../components/builder.svelte";
    import Previewer from "../components/previewer.svelte";

    let selected_pms = $state(["Lazy", "Packer"]);
    let url = $state("github.com/sylvanfranklin/omnipreview");
    let branch = $state("");
    let tag = $state("");
    let options = $state("");
    let lazy = $state(true);
    let links = $state(true);
</script>

<main
    class="flex flex-row w-screen h-screen font-mono justify-center bg-gray-800"
>
    <span
        class="flex flex-col w-full gap-3 rounded-xs p-8 bg-black text-white overflow-scroll text-lg"
    >
        <Builder
            bind:selected_pms
            bind:url
            bind:branch
            bind:tag
            bind:options
            bind:links
            bind:lazy
        />
    </span>
    <Previewer {selected_pms} {url} {tag} {branch} {options} {links} {lazy} />
</main>
