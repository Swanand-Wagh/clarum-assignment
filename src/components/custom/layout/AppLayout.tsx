import React from 'react';
import { ReactChildrenProp } from '@/interfaces/utils';
import { Header } from './Header';
import { Footer } from './Footer';

export const AppLayout: React.FunctionComponent<Readonly<ReactChildrenProp>> = ({ children }): JSX.Element => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col p-12">{children}</main>
      <Footer />
    </div>
  );
};
