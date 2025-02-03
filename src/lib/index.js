export const pms = ["lazy", "packer", "plug", "vundle", "pckr"];

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
    }

}



