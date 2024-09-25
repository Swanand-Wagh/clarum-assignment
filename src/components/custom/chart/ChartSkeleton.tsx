import React from 'react';
import { Each } from '@/components/utils';

const skeletonHights: Array<number> = [40, 64, 64, 72, 64, 72, 48, 72, 48, 64] as const;

export const ChartSkeleton: React.FunctionComponent = (): JSX.Element => {
  return (
    <div role="status" className="mb-6 h-80 w-full animate-pulse px-4 dark:border-gray-700 md:px-6">
      <div className="grid grid-cols-10 items-end gap-10">
        <Each<number>
          of={skeletonHights}
          render={(height) => (
            <div style={{ height: height * 4 }} className="w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
          )}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
