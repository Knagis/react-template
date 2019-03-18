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
        }]),
        require("postcss-nested"),
        require("postcss-property-lookup"),
        require("postcss-calc"),
        require("autoprefixer")({
            browsers: [
                "defaults",
                "iOS>=9.3",
                "Safari>=10.1",
                "Edge>=15",
                "Firefox>=52",
                "Chrome>=48",
            ],
        }),
    ],
};
