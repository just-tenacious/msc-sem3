import React from "react";
import { createRoot } from "react-dom/client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client";

import App from "./App.jsx";
import "./index.css";

const httpLink = new HttpLink({
  uri: "http://localhost:4005/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);