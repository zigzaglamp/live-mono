// src/App.tsx

import { BrowserRouter } from "react-router-dom";
import Layout from "./app/layout/Layout";
import AppRoutes from "./app/router";


export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}