"use client";

import { useRouter, usePathname } from "@/i18n/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { I18N_LOCALE } from "@/constants/i18n-config";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // 'en', 'id', etc.
  const changeLocale = (locale: string) => {
    router.replace({ pathname }, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-black rounded-md cursor-pointer dark:text-white"
        >
          <Languages className="w-5 h-5" />
          {locale}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        {I18N_LOCALE.map((locale: any) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLocale(locale)}
            className="cursor-pointer"
          >
            {locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
