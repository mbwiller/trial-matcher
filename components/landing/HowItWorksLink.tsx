"use client";

import type { MouseEvent } from "react";
import { buttonClasses, type ButtonLinkSize } from "./ButtonLink";

const TARGET_ID = "how";

/**
 * Ghost "How it works" anchor for the top bar. A plain hash link that, when JS
 * is available, scrolls smoothly (unless the user prefers reduced motion) and
 * moves focus to the section so keyboard and screen-reader users land there.
 */
export function HowItWorksLink({
  size = "sm",
  className,
}: {
  size?: ButtonLinkSize;
  className?: string;
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(TARGET_ID);
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    target.focus({ preventScroll: true });
    window.history.replaceState(null, "", `#${TARGET_ID}`);
  };

  return (
    <a href={`#${TARGET_ID}`} onClick={onClick} className={buttonClasses("ghost", size, className)}>
      How it works
    </a>
  );
}
