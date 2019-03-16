import * as React from "react";
import { render } from "react-dom";
import { Layout } from "./view/Layout";

function initialize() {
    const container = document.getElementById("root");
    render(React.createElement(Layout), container);
}

initialize();
