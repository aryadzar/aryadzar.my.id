"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from "./toogle-mode";
import Link from "next/link";
import LanguageSwitcher from "./language-switcher";
import { useNavItems } from "@/constants/nav-constant";

export function NavbarView() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = useNavItems();

  return (
    <div className="inset-x-0 w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              href="https://legacy.aryadzar.my.id"
              variant="secondary"
              className="px-4 py-2"
              target="_blank"
            >
              Legacy
            </NavbarButton>
            <NavbarButton>
              <ModeToggle />
            </NavbarButton>
            <NavbarButton>
              <LanguageSwitcher />
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <div key={`mobile-link-${idx}`} className="flex flex-col gap-3">
                {item.children ? (
                  <>
                    <span className="relative text-neutral-900 font-medium dark:text-neutral-100">
                      {item.name}
                    </span>
                    <div className="flex flex-col gap-3 pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-1">
                      {item.children.map((child, cIdx) => (
                        <Link
                          key={`mobile-sublink-${cIdx}`}
                          href={child.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="relative text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                          <span className="block">{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.link!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    <span className="block">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="https://legacy.aryadzar.my.id"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
              target="_blank"
            >
              <span className="block">Legacy</span>
            </Link>
            <div className="flex flex-col w-full gap-4">
              <ModeToggle />
              <LanguageSwitcher />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
