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
];

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

export function parse_options(options) {
  if (options.length < 30) {
    return options;
  } else {
    return "\n\t\t" + options.replaceAll(", ", ",\n\t\t") + "\n\t";
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

  const part = full.replace(".nvim", "").split("/")[1] || "";
  return [full, part];
}

export const templates = {
  lazy: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `{
    "${full}", ${branch && `\n\tbranch = "${branch}",`}${lazy ? `\n\tlazy = true,` : ""}${tag && `\n\ttag = "${tag}",`}${options.length > 0 ? `\n\topts = {${options}}` : ""}\n}`;
  },

  packer: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `{
    "${full}", ${branch && `\n\tbranch = "${branch}",`}${lazy ? `\n\topt = true,` : ""}${tag && `\n\ttag = "${tag}",`}
    config = function()
        require("${part}").setup({${options}}) 
    end
}`;
  },

  paq: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `{
    "${full}", ${branch && `\n\tbranch = "${branch}",`},
    ${options.length > 0 ? `opt = {${options}}` : ""}\n}`;
  },

  plug: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `Plug("${full}"${branch ? `, { 'branch': '${branch}' }` : ""}${tag ? `, { 'tag': '${tag}'}` : ""}${options.length > 0 ? "[ do ] = function()\n end" : ""})`;
  },

  vundle: (url, branch, tag, options, lazy) => {
    const [full] = clean_names(url);
    return `Plugin '${full}'${branch ? `, { 'branch': '${branch}' }` : ""}${tag ? `, { 'tag': '${tag}' }` : ""}`;
  },

  pckr: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `{
    "${full}", ${branch ? `\n\tbranch = "${branch}",` : ""}${tag ? `\n\ttag = "${tag}",` : ""}
    config = function()
        require("${part}").setup()
    end
}`;
  },
  rockstoml: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `[plugins.${full}]
version = "1.0.0"
opt = true
`;
  },
  rockscommand: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `Rocks install ${part}`;
  },
  mini: (url, branch, tag, options, lazy) => {
    const [full, part] = clean_names(url);
    return `add({
    source = '${full}',
    checkout = '${branch}'
})
`;
  },
};
