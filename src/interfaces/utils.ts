import React from 'react';

export interface ReactChildrenProp {
  children: React.ReactNode;
}

export interface EachProps<TList = unknown> {
  of: Array<TList>;
  render: (item: TList, index: string) => JSX.Element;
}

export interface ShowProps {
  children: Array<{ props: ReactChildrenProp | WhenProps }>;
}

export interface WhenProps extends ReactChildrenProp {
  isTrue: boolean;
}

export interface ShowComponent extends React.FunctionComponent<Readonly<ShowProps>> {
  When: React.FunctionComponent<WhenProps>;
  Else: React.FunctionComponent<ReactChildrenProp>;
}
