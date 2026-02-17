export const CATEGORY_ORDER = [
  "action",
  "idee",
  "inquietude",
  "information",
  "non-classe",
];

export const CATEGORY_MAP = {
  action: {
    id: "action",
    emoji: "🔴",
    label: "Action concrète",
    exportTitle: "Actions concrètes",
    buttonClass: "btn--action",
    shortcut: "1",
  },
  idee: {
    id: "idee",
    emoji: "🟡",
    label: "Idée créative",
    exportTitle: "Idées créatives",
    buttonClass: "btn--idea",
    shortcut: "2",
  },
  inquietude: {
    id: "inquietude",
    emoji: "🔵",
    label: "Inquiétude / émotion",
    exportTitle: "Inquiétudes / émotions",
    buttonClass: "btn--inquietude",
    shortcut: "3",
  },
  information: {
    id: "information",
    emoji: "🟢",
    label: "Information à garder",
    exportTitle: "Informations à garder",
    buttonClass: "btn--info",
    shortcut: "4",
  },
  "non-classe": {
    id: "non-classe",
    emoji: "⚪",
    label: "Non classé",
    exportTitle: "Non classé",
  },
};

export const ACTIVE_CATEGORIES = [
  CATEGORY_MAP.action,
  CATEGORY_MAP.idee,
  CATEGORY_MAP.inquietude,
  CATEGORY_MAP.information,
];
