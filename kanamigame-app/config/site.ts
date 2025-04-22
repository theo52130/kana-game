export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  mainNav: {
    title: "KanamiGame",
    titleKana: "カナミゲーム",
    description: "Un jeu interactif et amusant pour maîtriser les hiragana et katakana à votre rythme.",
    descriptionKana: "自分のペースでひらがなやカタカナをマスターできる、楽しいインタラクティブなゲームです。"
  },
  navItems: [
    {
      label: "test",
      href: "/test",
    },
    {
      label: "bdd",
      href: "/bdd",
    }
  ],
  navItemsMobile: [

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
