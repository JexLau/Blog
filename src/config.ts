import type { Socials } from "./types";

export const SITE_URL = "https://jexcoder.com"; // Replace with your site url
export const SITE_TITLE = "Jex";
export const SITE_DESCRIPTION = "Something Records for Jex";
export const SITE_LOGO = "/logo.svg";

export const SOCIALS: Socials = [
  {
    name: "Github",
    href: "https://github.com/jexlau/blog",
    linkTitle: ` ${SITE_TITLE} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/aryanjha256/verve",
    linkTitle: `${SITE_TITLE} on Facebook`,
    active: false,
  },
  {
    name: "Instagram",
    href: "https://github.com/aryanjha256/verve",
    linkTitle: `${SITE_TITLE} on Instagram`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://github.com/aryanjha256/verve",
    linkTitle: `${SITE_TITLE} on Twitter`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://github.com/aryanjha256/verve",
    linkTitle: `${SITE_TITLE} on LinkedIn`,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE_TITLE}`,
    active: false,
  },
];
