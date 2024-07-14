import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.tsx";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider >
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
