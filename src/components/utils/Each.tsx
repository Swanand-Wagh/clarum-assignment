import { Children } from 'react';
import { EachProps } from '@/interfaces/utils';

export const Each = <TList,>({ of, render }: Readonly<EachProps<TList>>) =>
  Children.toArray(of.map((item, index) => render(item, `${index}__${new Date().getTime()}`)));
