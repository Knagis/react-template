const path = require("path");
const postcss = require("postcss");

module.exports = postcss.plugin("postcss-banner", function configure() {
    return function addFilename(css) {
        const absolute = css.source.input.file;
        const root = path.resolve(__dirname, "..");
        const relative = path.relative(root, absolute).replace(/\\/g, "/");
        css.prepend(`/* ${relative} */`);

        if (css.nodes[1]) {
            css.nodes[1].raws.before = "\n";
        }
    };
});
