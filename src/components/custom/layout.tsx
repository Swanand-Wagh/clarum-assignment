import React from "react";
import { ReactChildrenProp } from "@/interfaces/utils";
import { Header } from "./header";
import { Footer } from "./footer";

export const AppLayout: React.FunctionComponent<
  Readonly<ReactChildrenProp>
> = ({ children }): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-12 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};
