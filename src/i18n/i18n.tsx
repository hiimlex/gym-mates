import i18next from "i18next";

import enUS from "./locales/en-US";
import ptBR from "./locales/pt-BR";

import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init(
  {
    lng: "en-US",
    resources: {
      "pt-BR": {
        translation: ptBR,
      },
      "en-US": {
        translation: enUS,
      },
    },
    compatibilityJSON: "v4",
  },
  () => {},
);
