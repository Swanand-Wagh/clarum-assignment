import React from 'react';
import { ReactChildrenProp, ShowComponent, WhenProps } from '@/interfaces/utils';

export const Show: ShowComponent = ({ children }) => {
  let when = null;
  let otherwise = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    const { props } = child;

    if (!('isTrue' in props)) otherwise = child;
    else if (props.isTrue) when = child;
  });

  return when ?? otherwise;
};

const When: React.FunctionComponent<Readonly<WhenProps>> = ({ children, isTrue }): React.ReactNode =>
  isTrue && children;

const Else: React.FunctionComponent<Readonly<ReactChildrenProp>> = ({ children }): React.ReactNode => children;

Show.When = When;
Show.Else = Else;
