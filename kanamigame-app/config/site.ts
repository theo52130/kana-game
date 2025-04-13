export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "KanamiGame",
  description: "Un jeu interactif et amusant pour maîtriser les hiragana et katakana à votre rythme.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "test",
      href: "/test",
    },
    {
      label: "bdd",
      href: "/bdd",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    }
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "test",
      href: "/test",
    },
    {
      label: "bdd",
      href: "/bdd",
    }
  ],
  links: {
    github: "https://github.com/theo52130",
  },
};
