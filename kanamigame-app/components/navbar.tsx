"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { DiscordIcon, Logo, GithubIcon } from "@/components/icons";
import NextLink from "next/link";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { KanaRomanjiSwitch } from "@/components/kana-romanji-switch";

export const Navbar = () => {
  // Ajouter un état pour gérer l'ouverture/fermeture du menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour fermer le menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={(open) => setIsMenuOpen(open)}
    >
      {/* Section gauche : Logo */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center"
            href="/"
            onClick={closeMenu}
          >
            {/* <Logo size={40} /> */}
            <p className="font-bold text-secondary-600">
              {siteConfig.mainNav.title}
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Section centrale : Liens de navigation */}
      <NavbarContent className="hidden sm:flex basis-3/5" justify="center">
        {siteConfig.navItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color="foreground" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Section droite : Boutons et switch de thème */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link href="https://github.com/theo52130" isExternal className="p-1">
            <GithubIcon className="cursor-pointer transition-opacity hover:opacity-80" />
          </Link>
          <Link
            href="#"
            // isExternal
            className="p-1"
          >
            <DiscordIcon className="cursor-pointer transition-opacity hover:opacity-80" />
          </Link>
          <KanaRomanjiSwitch />
          <ThemeSwitch />
          <Button size="md" radius="full" color="secondary">
            LogIn
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Menu mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link href="https://github.com/theo52130" isExternal className="p-1">
          <GithubIcon className="cursor-pointer transition-opacity hover:opacity-80" />
        </Link>
        <Link
          href="#"
          // isExternal
          className="p-1"
        >
          <DiscordIcon className="cursor-pointer transition-opacity hover:opacity-80" />
        </Link>
        <KanaRomanjiSwitch />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItemsMobile.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                color="foreground"
                href={item.href}
                size="lg"
                onPress={closeMenu}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
