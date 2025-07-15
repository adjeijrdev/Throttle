import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import {
  ApolloProvider
} from "@apollo/client";

import {graphqlConfiguration} from "./graphql/graphqlConfiguration.js";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={graphqlConfiguration}>
      <Provider store={store}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: "",
            style: {
              padding: "16px",
              width: "500px",
            },
          }}
        />

        <App />
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
