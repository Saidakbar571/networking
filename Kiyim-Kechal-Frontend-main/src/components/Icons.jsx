// Lightweight inline icon set (stroke-based, 24x24).
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconSearch = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const IconBag = (p) => (
  <svg {...base} {...p}><path d="M6 7h12l1 13H5L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
);
export const IconHeart = (p) => (
  <svg {...base} {...p} fill={p?.fill || "none"}>
    <path d="M12 20s-7-4.4-9.3-8.5C1.2 8.8 2.6 5.5 5.8 5.5c1.9 0 3.2 1.1 4.2 2.4C11 6.6 12.3 5.5 14.2 5.5c3.2 0 4.6 3.3 3.1 6C19 15.6 12 20 12 20Z" />
  </svg>
);
export const IconUser = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>
);
export const IconPlus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconClose = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconLogout = (p) => (
  <svg {...base} {...p}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5" /><path d="M5 12h12" /></svg>
);
export const IconBox = (p) => (
  <svg {...base} {...p}><path d="M21 8 12 3 3 8l9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
);
export const IconTag = (p) => (
  <svg {...base} {...p}><path d="M20.6 13.4 13 21l-9-9V4h8l8.6 8.6a1.4 1.4 0 0 1 0 2Z" /><circle cx="7.5" cy="7.5" r="1.3" /></svg>
);
export const IconStar = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? "currentColor" : "none"}>
    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9L12 3Z" />
  </svg>
);
export const IconArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);
export const IconSparkle = (p) => (
  <svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" /></svg>
);
export const IconTrash = (p) => (
  <svg {...base} {...p}><path d="M4 7h16" /><path d="M9 7V5h6v2" /><path d="M6 7l1 13h10l1-13" /></svg>
);
