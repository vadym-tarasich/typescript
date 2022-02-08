import { render } from "react-dom";
import { createAppStoreWithUpdates } from "./notesStorage";

import { App } from "./App";

createAppStoreWithUpdates();

const rootElement = document.getElementById("root");
render(<App />, rootElement);
