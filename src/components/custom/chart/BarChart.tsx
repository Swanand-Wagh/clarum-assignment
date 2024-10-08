import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChartProps } from '@/interfaces/chart';
import { Show } from '@/components/utils';
import { ChartSkeleton } from './ChartSkeleton';
import { Chart } from './Chart';

export const BarChart = <TChartData,>({
  children,
  chartData,
  chartSubTitle,
  chartTitle,
  isDataFetching,
}: Readonly<BarChartProps<TChartData>>): JSX.Element => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex min-h-5 items-center">
          <CardTitle>{chartTitle}</CardTitle>
        </div>
      </CardHeader>
      <Show>
        <Show.When isTrue={isDataFetching}>
          <ChartSkeleton />
        </Show.When>
        <Show.Else>
          <Chart<TChartData> data={chartData} />
        </Show.Else>
      </Show>
      <CardFooter className="flex items-center justify-between gap-8 text-sm">
        <div className="leading-none text-muted-foreground">{chartSubTitle}</div>
        {children}
      </CardFooter>
    </Card>
  );
};
