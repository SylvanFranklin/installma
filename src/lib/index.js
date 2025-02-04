export const all_pms = [
    "Lazy",
    "Packer",
    "Rocks command",
    "Rocks toml",
    "Mini",
    "Pckr",
    "Paq",
    "Plug",
    "Vundle",
]

export function pm_link(pm) {
    switch (pm) {
        case "Lazy":
            return "https://github.com/folke/lazy.nvim";
        case "Packer":
            return "https://github.com/wbthomason/packer.nvim";
        case "Rocks command":
            return "";
        case "Rocks toml":
            return "https://github.com/nvim-neorocks/rocks.nvim?tab=readme-ov-file";
        case "Mini Deps":
            return "https://github.com/nvim-neorocks/rocks.nvim?tab=readme-ov-file";
        case "Pckr":
            return "https://github.com/lewis6991/pckr.nvim";
        case "Paq":
            return "https://github.com/savq/paq-nvim";
        case "Plug":
            return "https://github.com/junegunn/vim-plug";
        case "Vundle":
            return "https://github.com/VundleVim/Vundle.vim";
        default:
            return "#"; // Fallback for undefined cases
    }
}



function clean_names(repo) {

    const full = repo
        .replace("https://github.com/", "")
        .replace("github.com/", "")
        .replace("https://gitlab.com/", "")
        .replace("gitlab.com/", "")
        .replace(".git", "")
        .trim();

    const part = full.replace(".nvim", "").split("/")[1] || ""
    return [full, part]
}


export const templates = {
    lazy: (url, branch, tag) => {
        const [full, part] = clean_names(url)
        return `{
    "${full}", ${branch && `\n\tbranch = "${branch}",`}${tag && `\n\ttag = "${tag}",`}
    opts = {}
}`
    },

    packer: (url, branch, tag) => {
        const [full, part] = clean_names(url)
        return `{
    "${full}", ${branch && `\n\tbranch = "${branch}",`}${tag && `\n\ttag = "${tag}",`}
    config = function()
        require("${part}").setup() 
    end
}`
    },


    paq: (url, branch) => {
        const [full, part] = clean_names(url)
        return `{
    "${full}", ${branch && `\n\tbranch = "${branch}",`}
}`
    },

    plug: (url, branch, tag) => {
        const [full, part] = clean_names(url);
        return `"${full}" ${branch ? `, { 'branch': '${branch}' }` : ""}${tag ? `, { 'tag': '${tag}' }` : ""}`;
    },

    vundle: (url, branch, tag) => {
        const [full] = clean_names(url);
        return `Plugin '${full}'${branch ? `, { 'branch': '${branch}' }` : ""}${tag ? `, { 'tag': '${tag}' }` : ""}`;
    },

    pckr: (url, branch, tag) => {
        const [full, part] = clean_names(url);
        return `{
    "${full}", ${branch ? `\n\tbranch = "${branch}",` : ""}${tag ? `\n\ttag = "${tag}",` : ""}
    config = function()
        require("${part}").setup()
    end
}`;
    },
    rockstoml: (url, branch, tag) => {
        const [full, part] = clean_names(url);
        return `[plugins.${full}]
version = "1.0.0"
opt = true
`;

    },
    rockscommand: (url, branch, tag) => {
        const [full, part] = clean_names(url);
        return `Rocks install ${part}`;

    },
    mini: (url, branch, tag) => {
        const [full, part] = clean_names(url);
        return `add({
    source = '${full}',
    checkout = '${branch}'
})
`;
    }
}
