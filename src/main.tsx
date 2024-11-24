import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@store/index.ts";

import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
