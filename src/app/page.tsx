'use client';

import { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { EyeIcon } from 'lucide-react';
import { BarChart } from '@/components/custom/chart';
import { AppLayout } from '@/components/custom/layout';
import { Button } from '@/components/ui/button';
import { BarChartData } from '@/interfaces/chart';
import { Show } from '@/components/utils';
import { AddNumbersModal, ViewNumbersModal } from '@/components/custom/modal';

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

const App: NextPage = (): JSX.Element => {
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true);
  const [chartData, setChartData] = useState<Array<BarChartData>>([]);

  const handleViewModalOpen = () => setOpenViewModal(true);
  const handleViewModalClose = () => setOpenViewModal(false);

  const handleAddModalOpen = () => setOpenAddModal(true);
  const handleAddModalClose = () => setOpenAddModal(false);

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
            <Button className="flex items-center gap-1" onClick={handleViewModalOpen}>
              <EyeIcon size={20} />
              View Numbers
            </Button>
          </Show.Else>
        </Show>
      </BarChart>
      <ViewNumbersModal
        openViewModal={openViewModal}
        handleAddModalOpen={handleAddModalOpen}
        handleViewModalClose={handleViewModalClose}
        openAddModal={openAddModal}
        chartData={chartData}
      />
      <AddNumbersModal
        openAddModal={openAddModal}
        handleAddModalClose={handleAddModalClose}
        lastYear={lastYear}
        setChartData={setChartData}
      />
    </AppLayout>
  );
};

export default App;
