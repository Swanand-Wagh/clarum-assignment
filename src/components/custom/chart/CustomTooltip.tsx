import React from 'react';

const formatter = new Intl.NumberFormat('en-US');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTooltip: React.FunctionComponent<any> = ({ payload, label, active }) => {
  if (!active) return null;

  return (
    <div className="w-max rounded-md border bg-white p-3 shadow-sm">
      <p className="label mb-1 font-semibold">{label}</p>
      <div className="flex items-center justify-between gap-10">
        <div className="flex items-center gap-1">
          <div
            className="h-3 w-3"
            style={{
              backgroundColor: 'hsl(142.1 76.2% 36.3%)',
            }}
          ></div>
          <p className="font-medium text-foreground">Sales</p>
        </div>
        <div>{formatter.format(payload[0]?.payload?.sales)}</div>
      </div>
    </div>
  );
};
