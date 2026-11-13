import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "home"
  | "search"
  | "bookmark"
  | "activity"
  | "profile"
  | "heart"
  | "arrow"
  | "spark"
  | "close"
  | "menu"
  | "check"
  | "filter"
  | "download"
  | "comment"
  | "send"
  | "more"
  | "image";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9M9 20v-6h6v6" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />,
  activity: (
    <>
      <path d="M3 12h4l2.2-6 4.1 12 2.2-6H21" />
      <path d="M4 4h16v16H4z" opacity=".18" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  heart: (
    <path d="M20.4 8.8c0 4.2-8.4 10-8.4 10s-8.4-5.8-8.4-10A4.4 4.4 0 0 1 12 6.1a4.4 4.4 0 0 1 8.4 2.7Z" />
  ),
  arrow: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  spark: (
    <>
      <path d="m12 2 1.5 7.5L21 12l-7.5 1.5L12 21l-1.5-7.5L3 12l7.5-2.5L12 2Z" />
      <path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  filter: (
    <>
      <path d="M4 7h16M7 12h10M10 17h4" />
      <circle cx="8" cy="7" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="12" cy="17" r="1.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M5 17v3h14v-3" />
    </>
  ),
  comment: (
    <path d="M20.5 11.5a8.5 8.5 0 0 1-9 8.5 9.8 9.8 0 0 1-4-.8L3 21l1.7-4.1A8.2 8.2 0 0 1 3.5 12a8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8Z" />
  ),
  send: <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
