import { CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartProps, RenderCustomBarLabelArgs } from '@/interfaces/chart';
import millify from 'millify';
import { Bar, BarChart as BarChartPrimitive, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { CustomTooltip } from './CustomTooltip';

const chartConfig = {
  sales: {
    color: 'hsl(142.1 76.2% 36.3%)',
  },
} satisfies ChartConfig;

export const Chart = <TChartData,>({ data }: Readonly<ChartProps<TChartData>>): JSX.Element => {
  const renderCustomBarLabel = ({ x, y, width, value }: RenderCustomBarLabelArgs) => {
    return (
      <text x={x + width / 2} y={y} className="fill-black font-semibold dark:fill-white" textAnchor="middle" dy={-6}>
        {millify(value)}
      </text>
    );
  };

  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="h-72 w-[26rem] md:w-full">
        <BarChartPrimitive
          accessibilityLayer
          data={data}
          margin={{
            top: 26,
          }}
          className="bg-[length:125px_125px] bg-center bg-no-repeat bg-blend-exclusion"
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="year" tickLine={true} tickMargin={10} axisLine={false} />
          <YAxis
            dataKey="sales"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => millify(value)}
          />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Bar
            dataKey="sales"
            className="opacity-75"
            fill="var(--color-sales)"
            radius={8}
            label={renderCustomBarLabel}
          ></Bar>
        </BarChartPrimitive>
      </ChartContainer>
    </CardContent>
  );
};
