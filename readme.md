# react-template

This is a opinionated template for using the following:

* React
* Webpack
* TypeScript
* PostCSS
* CSS modules
* CSS in separate file
* HTML template file

## Running

1. `yarn install`
2. `yarn watch`
3. Open `dist/index.html` in browser (works without web server in Chrome).

## Deploy

1. `yarn install`
2. `yarn build`
3. Copy `dist` folder to your target server.

## Custom features

* Build scripts completely separated from source
  * Runtime dependencies are added to `src/package.json`.
  * Development dependencies are added to `build/package.json`.
* Image inlining as data-uri
  * Automatic inlining based on file size (<1KB gets inlined)
  * Force inline using `import * as img from "./img.png?inline"` or `url(./img.png?inline)`.
  * Force download using `url(./img.png?download)`.
