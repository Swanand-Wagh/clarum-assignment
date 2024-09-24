import React from "react";
import { Each } from "@/components/utils";

const skeletonHights: Array<number> = [
  48, 64, 64, 72, 64, 72, 48, 72, 48, 64,
] as const;

export const ChartSkeleton: React.FunctionComponent = (): JSX.Element => {
  return (
    <div
      role="status"
      className="px-4 h-80 mb-6 animate-pulse md:px-6 dark:border-gray-700 w-full"
    >
      <div className="flex items-end">
        <Each<number>
          of={skeletonHights}
          render={(height) => (
            <div
              className={`w-full bg-gray-200 rounded-t-lg h-${height} dark:bg-gray-700`}
            ></div>
          )}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
