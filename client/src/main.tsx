import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./configs/store.ts";
import { Provider } from "react-redux";
import ErrorBoundary from "shared/utils/ErrorBoundary.tsx";
import PersistAuth from "shared/utils/PersistAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <PersistAuth />
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);
