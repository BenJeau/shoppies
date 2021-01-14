import React from "react";
import { render } from "react-dom";

import { Home } from "./pages";
import { Provider } from "./utils";

import "@shopify/polaris/dist/styles.css";

render(
  <Provider>
    <Home />
  </Provider>,
  document.getElementById("root")
);
