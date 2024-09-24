import React from "react";

const formatter = new Intl.NumberFormat("en-US");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTooltip: React.FunctionComponent<any> = ({
  payload,
  label,
  active,
}) => {
  if (!active) return null;

  return (
    <div className="rounded-md shadow-sm border bg-white p-3 w-max">
      <p className="label font-semibold mb-1">{label}</p>
      <div className="flex items-center gap-10 justify-between">
        <div className="flex items-center gap-1">
          <div
            className="h-3 w-3"
            style={{
              backgroundColor: "hsl(142.1 76.2% 36.3%)",
            }}
          ></div>
          <p className="font-medium text-foreground">Sales</p>
        </div>
        <div>{formatter.format(payload[0]?.payload?.sales)}</div>
      </div>
    </div>
  );
};
