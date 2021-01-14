import React from "react";
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

const Provider: React.FC = ({ children }) => (
  <React.StrictMode>
    <AppProvider i18n={translations} features={{ newDesignLanguage: true }}>
      {children}
    </AppProvider>
  </React.StrictMode>
);

export default Provider;
