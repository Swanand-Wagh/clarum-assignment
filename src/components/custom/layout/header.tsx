import React from "react";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Header: React.FunctionComponent = (): JSX.Element => {
  return (
    <header className="w-screen sticky top-0 z-50 border-border/40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-12 flex gap-8 justify-between h-14 max-w-screen-3xl items-center">
        <Link href="/" className="flex items-center font-medium gap-0.5">
          Clarum Assignment
        </Link>
        <Link
          href="https://github.com/Swanand-Wagh/clarum-assignment"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-colors hover:text-foreground/75 text-foreground"
        >
          <span className="font-medium">Swanand Wagh</span>
          <GitHubLogoIcon className="scale-150" />
        </Link>
      </div>
    </header>
  );
};
