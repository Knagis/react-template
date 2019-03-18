const fs = require("fs");
const path = require("path");

module.exports = {
    plugins: [
        require("./postcss-banner"),
        require("postcss-advanced-variables")(),
        require("postcss-url")([{
            filter: (asset) => {
                if (!fs.existsSync(asset.absolutePath)) {
                    return false;
                }

                if (/inline|embed/.test(asset.search)) {
                    return true;
                }

                if (/download/.test(asset.search)) {
                    return false;
                }

                const size = fs.statSync(asset.absolutePath).size;
                if (path.extname(asset.absolutePath) === ".svg") {
                    // inline SVG files <=3KB since their data-uri encoding does not increase the length too much
                    return size <= 3 * 1024;
                } else {
                    // other files (such as PNG) are inlined only when they are <=1KB since base64 encoding increases length more
                    return size <= 1 * 1024;
                }
            },
            url: "inline",
            optimizeSvgEncode: true,
        }, {
            url: (asset, dir, options, decl, warn, result) => {
                // Convert url() paths for imported resources

                if (!asset.url.startsWith(".")) {
                    // maintain original absolute url
                    return asset.url;
                } else if (!asset.relativePath.startsWith(".")) {
                    // relative path into the current directory. by default postcss-url removes the leading `./
                    // without which webpack will look into node_modules, not current directory.
                    return "./" + asset.relativePath.replace(/\\/g, "/");
                } else {
                    // relative url that was changed to match the file where the source was imported into
                    return asset.relativePath.replace(/\\/g, "/");
                }
            },
        }]),
        require("postcss-nested"),
        require("postcss-property-lookup"),
        require("postcss-calc"),
        require("autoprefixer")({
            browsers: [
                "Android >= 4.2",
                "Safari >= 10",
                "iOS >= 6",
                "Chrome >= 30",
                "Firefox >= 40",
                "Explorer >= 11",
                "Opera >= 40",
                "Edge >= 14",
            ],
        }),
    ],
};
