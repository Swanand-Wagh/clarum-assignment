'use client';

import { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { EyeIcon } from 'lucide-react';
import { BarChart } from '@/components/custom/chart';
import { AppLayout } from '@/components/custom/layout';
import { Modal } from '@/components/custom/modal';
import { Button } from '@/components/ui/button';
import { BarChartData } from '@/interfaces/chart';
import { Each, Show } from '@/components/utils';
import { SalesForm } from '@/components/custom/form';
import { cn } from '@/lib/utils';

const data: Array<BarChartData> = [
  { year: 2015, sales: 5000000 },
  { year: 2016, sales: 3000000 },
  { year: 2017, sales: 2500000 },
  { year: 2018, sales: 1000000 },
  { year: 2019, sales: 1200000 },
  { year: 2020, sales: 1500000 },
  { year: 2021, sales: 9000000 },
  { year: 2022, sales: 2000000 },
  { year: 2023, sales: 1800000 },
  { year: 2024, sales: 7000000 },
] as const;

const formatter = new Intl.NumberFormat('en-US');

const App: NextPage = (): JSX.Element => {
  const [openViewNumbersModal, setOpenViewNumbersModal] = useState<boolean>(false);
  const [openAddNumbersModal, setOpenAddNumbersModal] = useState<boolean>(false);
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true);
  const [chartData, setChartData] = useState<Array<BarChartData>>([]);

  const lastYear = useMemo(() => {
    if (!chartData.length) return 0;
    return chartData[chartData.length - 1].year;
  }, [chartData, chartData.length]);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 2500)).then(() => {
      setIsDataFetching(false);
      setChartData(data);
    });
  }, []);

  return (
    <AppLayout>
      <BarChart<BarChartData>
        chartData={chartData}
        chartSubTitle="Showing the total yearly sale of iPhones starting from 2015."
        chartTitle="Total Yearly Sale of IPhones (from 2015)"
        isDataFetching={isDataFetching}
      >
        <Show>
          <Show.When isTrue={isDataFetching}>{null}</Show.When>
          <Show.Else>
            <Modal open={openViewNumbersModal} onOpenChange={setOpenViewNumbersModal}>
              <Modal.Trigger>
                <Button className="flex items-center gap-1">
                  <EyeIcon size={20} />
                  View Numbers
                </Button>
              </Modal.Trigger>

              <Modal.Content
                modalTitle="Year Sales Numbers"
                showOverlay
                classnames={cn('transition-transform duration-150 bg-transparent', {
                  'scale-95': openAddNumbersModal,
                })}
                animation={{
                  initial: { opacity: 0.8, scale: 0.975 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0.8, scale: 0.975 },
                  duration: 0.075,
                }}
              >
                <div className="grid grid-cols-5 gap-2">
                  <Each<BarChartData>
                    of={chartData}
                    render={(item) => (
                      <div className="flex flex-col items-start rounded-md bg-accent p-1.5">
                        <span className="text-[10px] font-bold text-foreground/80">{item.year}</span>
                        <span className="text-xs font-bold text-foreground/90">{formatter.format(item.sales)}</span>
                      </div>
                    )}
                  />
                </div>

                <Modal.Footer modalCloseText="Close">
                  <Modal open={openAddNumbersModal} onOpenChange={setOpenAddNumbersModal}>
                    <Modal.Trigger>
                      <Button className="flex items-center gap-1">+ Add More Numbers</Button>
                    </Modal.Trigger>

                    <Modal.Content
                      modalTitle="Add More Numbers"
                      showOverlay={false}
                      classnames="translate-y-5 bg-transparent"
                      animation={{
                        initial: { translateY: 32, scale: 0.975 },
                        animate: { translateY: 0, scale: 1 },
                        exit: { translateY: 32, scale: 0.975 },
                        duration: 0.2,
                      }}
                    >
                      <p className="text-[15px] text-foreground/90">
                        Add the total sales for the year <span className="font-semibold">{lastYear + 1}</span> below. By
                        adding the sales for the year <span className="font-semibold">{lastYear + 1}</span>, you will be
                        able to see the updated chart.
                      </p>

                      <SalesForm
                        lastYear={lastYear}
                        setChartData={setChartData}
                        setOpenAddNumbersModal={setOpenAddNumbersModal}
                      />
                    </Modal.Content>
                  </Modal>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Show.Else>
        </Show>
      </BarChart>
    </AppLayout>
  );
};

export default App;
