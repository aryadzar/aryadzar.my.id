// Fallback uses/setup data used when Sanity has no entries yet.

export interface FallbackUsesItem {
  name: string;
  description: { en: string; id: string; de: string };
  category: "editor" | "terminal" | "devops" | "design" | "browser" | "hardware";
  link?: string;
  svgPath: string; // Simple Icons SVG path (viewBox 0 0 24 24)
  color: string;
}

export const USES_CATEGORY_ORDER = [
  "editor",
  "terminal",
  "devops",
  "design",
  "browser",
  "hardware",
] as const;

export const USES_CATEGORY_LABELS: Record<
  string,
  { en: string; id: string; de: string }
> = {
  editor: { en: "Editor & IDE", id: "Editor & IDE", de: "Editor & IDE" },
  terminal: { en: "Terminal", id: "Terminal", de: "Terminal" },
  devops: {
    en: "DevOps & Deployment",
    id: "DevOps & Deployment",
    de: "DevOps & Bereitstellung",
  },
  design: { en: "Design", id: "Desain", de: "Design" },
  browser: { en: "Browser", id: "Peramban", de: "Browser" },
  hardware: { en: "Hardware & OS", id: "Perangkat & OS", de: "Hardware & OS" },
};

export const USES_CATEGORY_ICONS: Record<string, string> = {
  editor:
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  terminal: "M4 17l6-6-6-6M12 19h8",
  devops:
    "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  design:
    "M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586 M11 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
  browser: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0v20m10-10H2",
  hardware:
    "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",
};

export const fallbackUses: FallbackUsesItem[] = [
  // ─── Editor & IDE ──────────────────────────────────────
  {
    name: "Visual Studio Code",
    description: {
      en: "My primary code editor. Fast, extensible, and has an incredible ecosystem of extensions.",
      id: "Editor kode utama saya. Cepat, extensible, dan memiliki ekosistem extension yang luar biasa.",
      de: "Mein Hauptcode-Editor. Schnell, erweiterbar und hat ein unglaubliches Ökosystem von Erweiterungen.",
    },
    category: "editor",
    link: "https://code.visualstudio.com",
    color: "#007ACC",
    svgPath:
      "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z",
  },
  {
    name: "Cursor",
    description: {
      en: "AI-powered code editor built on VS Code. Great for AI-assisted development workflows.",
      id: "Editor kode berbasis AI yang dibangun di atas VS Code. Cocok untuk alur kerja pengembangan dengan AI.",
      de: "KI-gestützter Code-Editor auf VS Code-Basis. Ideal für KI-unterstützte Entwicklungsworkflows.",
    },
    category: "editor",
    link: "https://cursor.sh",
    color: "#000000",
    svgPath:
      "M7.6 2h12.8v7.602H17.2V5.2H10.8v5.6H7.6V2zm-3.2 7.6h3.2v4.8h6.4v3.2H4.4V9.6zm0 7.602h3.2V24H4.4v-4.8h3.2v-2.398H4.4v-2.4zM14 14.4h6.4V24H14v-3.2h3.2v-3.2H14V14.4z",
  },

  // ─── Terminal ──────────────────────────────────────────
  {
    name: "Windows Terminal",
    description: {
      en: "Modern, feature-rich terminal for Windows with tabs, panes, and GPU-accelerated rendering.",
      id: "Terminal modern dan kaya fitur untuk Windows dengan tab, panel, dan rendering GPU.",
      de: "Modernes, funktionsreiches Terminal für Windows mit Tabs, Panels und GPU-beschleunigtem Rendering.",
    },
    category: "terminal",
    link: "https://github.com/microsoft/terminal",
    color: "#4D4D4D",
    svgPath:
      "M24 3.479H0v17.042h24zm-1.35 15.693H1.35V4.828h21.3zM2.14 8.433l6.448 3.723-6.448 3.723V8.433zM9.648 16.2h12.123v1.286H9.648z",
  },
  {
    name: "PowerShell",
    description: {
      en: "Cross-platform task automation framework with a scripting language built on .NET.",
      id: "Framework otomasi tugas lintas platform dengan bahasa scripting berbasis .NET.",
      de: "Plattformübergreifendes Task-Automatisierungs-Framework mit .NET-basierter Skriptsprache.",
    },
    category: "terminal",
    link: "https://github.com/PowerShell/PowerShell",
    color: "#5391FE",
    svgPath:
      "M23.181 2.974c.568 0 .923.463.792 1.035l-3.659 16.03c-.13.572-.697 1.035-1.265 1.035H.819c-.568 0-.923-.463-.792-1.035L3.686 3.973c.131-.572.697-1.035 1.265-1.035h18.23zM5.202 16.61c-.173.09-.179.264-.013.388l2.262 1.696c.166.124.477.127.691.006l8.138-4.583c.215-.121.209-.298-.012-.394L13.57 12.42c-.222-.096-.622-.078-.887.04zm5.195-6.147L5.444 13.58c-.218.122-.222.304-.008.404l2.83 1.315c.213.099.611.09.884-.02l4.996-2.01c.273-.11.266-.283-.017-.387l-3.72-1.418z",
  },

  // ─── DevOps & Deployment ───────────────────────────────
  {
    name: "Docker",
    description: {
      en: "Containerization platform for consistent development and deployment environments.",
      id: "Platform kontainerisasi untuk lingkungan pengembangan dan deployment yang konsisten.",
      de: "Containerisierungsplattform für konsistente Entwicklungs- und Bereitstellungsumgebungen.",
    },
    category: "devops",
    link: "https://docker.com",
    color: "#2496ED",
    svgPath:
      "M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.185.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186H2.22a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  },
  {
    name: "Git",
    description: {
      en: "Distributed version control system. Essential for every development workflow.",
      id: "Sistem kontrol versi terdistribusi. Esensial untuk setiap alur kerja pengembangan.",
      de: "Verteiltes Versionskontrollsystem. Unverzichtbar für jeden Entwicklungsworkflow.",
    },
    category: "devops",
    link: "https://git-scm.com",
    color: "#F05032",
    svgPath:
      "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.886.719-2.604 0-.536-.536-.67-1.326-.396-1.98L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.713.721-1.88.721-2.593 0-.713-.717-.713-1.879 0-2.6.182-.18.387-.316.604-.416V8.835c-.217-.099-.424-.236-.604-.416-.535-.535-.67-1.324-.396-1.98L7.636 3.716l-6.082 6.09c-.604.6-.604 1.58 0 2.186l10.48 10.48c.604.603 1.582.603 2.186 0l10.44-10.449c.604-.603.604-1.583-.002-2.186",
  },
  {
    name: "GitHub",
    description: {
      en: "Code hosting and collaboration platform. Where all my projects live.",
      id: "Platform hosting kode dan kolaborasi. Tempat semua proyek saya berada.",
      de: "Code-Hosting- und Kollaborationsplattform. Wo alle meine Projekte leben.",
    },
    category: "devops",
    link: "https://github.com",
    color: "#181717",
    svgPath:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "Vercel",
    description: {
      en: "Frontend cloud platform for deploying Next.js and other web applications.",
      id: "Platform cloud frontend untuk deploy Next.js dan aplikasi web lainnya.",
      de: "Frontend-Cloud-Plattform für die Bereitstellung von Next.js und anderen Webanwendungen.",
    },
    category: "devops",
    link: "https://vercel.com",
    color: "#000000",
    svgPath: "M24 22.525H0l12-21.05 12 21.05z",
  },

  // ─── Design ────────────────────────────────────────────
  {
    name: "Figma",
    description: {
      en: "Collaborative design tool for UI/UX design, prototyping, and design systems.",
      id: "Alat desain kolaboratif untuk desain UI/UX, prototyping, dan design system.",
      de: "Kollaboratives Designtool für UI/UX-Design, Prototyping und Designsysteme.",
    },
    category: "design",
    link: "https://figma.com",
    color: "#F24E1E",
    svgPath:
      "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z",
  },

  // ─── Browser ───────────────────────────────────────────
  {
    name: "Google Chrome",
    description: {
      en: "Primary browser for development. DevTools is incredibly powerful for debugging.",
      id: "Browser utama untuk pengembangan. DevTools sangat powerful untuk debugging.",
      de: "Hauptbrowser für die Entwicklung. DevTools ist unglaublich leistungsfähig zum Debuggen.",
    },
    category: "browser",
    link: "https://google.com/chrome",
    color: "#4285F4",
    svgPath:
      "M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848c.404.037.813.062 1.229.062 6.627 0 12-5.373 12-12 0-1.054-.136-2.079-.393-3.063H15.273z",
  },
  {
    name: "Firefox",
    description: {
      en: "Secondary browser for cross-browser testing and privacy-focused browsing.",
      id: "Browser sekunder untuk pengujian lintas browser dan browsing yang berfokus pada privasi.",
      de: "Zweitbrowser für Cross-Browser-Tests und datenschutzorientiertes Surfen.",
    },
    category: "browser",
    link: "https://firefox.com",
    color: "#FF7139",
    svgPath:
      "M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.216 1.03 2.565 1.072 3.948A8.46 8.46 0 0 0 18.1 3.18a9.27 9.27 0 0 0-.544-.735c-.076.08-.14.17-.193.27-.67 1.14-.998 2.276-1.06 2.8-.062.523-.021 1.16-.021 1.16a5.89 5.89 0 0 0-3.18-2.776c-.168-.07-.34-.128-.515-.174a4.985 4.985 0 0 0-.597-.12c.014.023-.01.052-.025.075a4.94 4.94 0 0 0-.53 2.082c-.037.716.072 1.44.318 2.12-.174-.1-.335-.218-.479-.354a5.533 5.533 0 0 1-1.457-2.45 7.583 7.583 0 0 0-1.068 1.737 7.654 7.654 0 0 0-.66 2.3c-.01.062-.02.124-.027.186 0 .017-.003.034-.005.05v.017a8.066 8.066 0 0 0 3.038 7.08A8.091 8.091 0 0 0 12 21.96a8.06 8.06 0 0 0 4.713-1.524 8.08 8.08 0 0 0 3.065-7.484c.004-.04.006-.08.008-.12 0-.013.003-.025.003-.037a8.557 8.557 0 0 0 3.01-3.547z",
  },

  // ─── Hardware & OS ─────────────────────────────────────
  {
    name: "Windows 11",
    description: {
      en: "Primary operating system for development. WSL2 makes it great for full-stack work.",
      id: "Sistem operasi utama untuk pengembangan. WSL2 membuatnya cocok untuk full-stack.",
      de: "Primäres Betriebssystem für die Entwicklung. WSL2 macht es ideal für Full-Stack-Arbeit.",
    },
    category: "hardware",
    link: "https://www.microsoft.com/windows",
    color: "#0078D4",
    svgPath:
      "M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801",
  },
  {
    name: "Mechanical Keyboard",
    description: {
      en: "A good mechanical keyboard makes coding sessions more enjoyable and productive.",
      id: "Keyboard mekanikal yang bagus membuat sesi coding lebih menyenangkan dan produktif.",
      de: "Eine gute mechanische Tastatur macht das Programmieren angenehmer und produktiver.",
    },
    category: "hardware",
    color: "#333333",
    svgPath:
      "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9 2h2v2h-2V9zm0 3h2v2h-2v-2zM7 9h2v2H7V9zm0 3h2v2H7v-2zm-1 5v-2h12v2H6zm11-5h2v2h-2v-2zm0-3h2v2h-2V9z",
  },
];
