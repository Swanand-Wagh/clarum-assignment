import React from 'react';

export interface BarChartProps<TData = unknown> {
  children: React.ReactNode;
  chartData: Array<TData>;
  chartSubTitle: string;
  chartTitle: string;
  isDataFetching: boolean;
}

export interface ChartProps<TData = unknown> {
  data: Array<TData>;
}

export interface RenderCustomBarLabelArgs {
  x: number;
  y: number;
  width: number;
  value: number;
}

export interface BarChartData {
  year: number;
  sales: number;
}
