import { I18N_LOCALE } from "@/constants/i18n-config";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: I18N_LOCALE,

  // Used when no locale matches
  defaultLocale: "en",
});
