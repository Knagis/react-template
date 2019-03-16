declare module "*.css" {
    type CssModuleMapping = { [key: string]: string };
    const mapping: CssModuleMapping;
    export = mapping;
}
