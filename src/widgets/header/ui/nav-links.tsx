"use client";

import { usePathname } from "next/navigation";

import { NavLinkList } from "./nav-link-list";

export function NavLinks() {
  return <NavLinkList pathname={usePathname()} />;
}
