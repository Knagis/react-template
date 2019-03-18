declare module "*.css" {
    type CssModuleMapping = { [key: string]: string };
    const mapping: CssModuleMapping;
    export = mapping;
}

declare module "*.pcss" {
    type CssModuleMapping = { [key: string]: string };
    const mapping: CssModuleMapping;
    export = mapping;
}

declare module "*.png" {
    const path: string;
    export = path;
}

declare module "*.svg" {
    const path: string;
    export = path;
}

declare module "*.jpg" {
    const path: string;
    export = path;
}

declare module "*.gif" {
    const path: string;
    export = path;
}
