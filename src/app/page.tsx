"use client";

import { NextPage } from "next";
import { useState } from "react";
import { EyeIcon } from "lucide-react";
import { BarChart } from "@/components/custom/chart";
import { AppLayout } from "@/components/custom/layout";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { BarChartData } from "@/interfaces/chart";
import { Each } from "@/components/utils";
import { SalesForm } from "@/components/custom/form";
import { cn } from "@/lib/utils";

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

const formatter = new Intl.NumberFormat("en-US");

const App: NextPage = (): JSX.Element => {
  const [openViewNumbersModal, setOpenViewNumbersModal] =
    useState<boolean>(false);
  const [openAddNumbersModal, setOpenAddNumbersModal] =
    useState<boolean>(false);

  return (
    <AppLayout>
      <BarChart<BarChartData>
        chartData={data}
        chartSubTitle="Showing the total yearly sale of iPhones starting from 2015."
        chartTitle="Total Yearly Sale of IPhones (from 2015)"
        isDataFetching={false}
      >
        <Modal
          open={openViewNumbersModal}
          onOpenChange={setOpenViewNumbersModal}
        >
          <Modal.Trigger>
            <Button className="flex items-center gap-1">
              <EyeIcon size={20} />
              View Numbers
            </Button>
          </Modal.Trigger>

          <Modal.Content
            modalTitle="Year Sales Numbers"
            showOverlay
            classnames={cn("transition-transform duration-300", {
              "scale-90": openAddNumbersModal,
            })}
          >
            <div className="grid grid-cols-4 gap-2">
              <Each<BarChartData>
                of={data}
                render={(item) => (
                  <div className="flex flex-col items-start rounded-md bg-accent p-2">
                    <span className="text-xs font-semibold text-foreground/70">
                      {item.year}
                    </span>
                    <span className="text-sm font-bold text-foreground/90">
                      {formatter.format(item.sales)}
                    </span>
                  </div>
                )}
              />
            </div>

            <Modal.Footer modalCloseText="Close">
              <Modal
                open={openAddNumbersModal}
                onOpenChange={setOpenAddNumbersModal}
              >
                <Modal.Trigger>
                  <Button className="flex items-center gap-1">
                    + Add More Numbers
                  </Button>
                </Modal.Trigger>
                <Modal.Content
                  modalTitle="Add More Numbers"
                  showOverlay={false}
                  classnames="translate-y-8"
                >
                  <SalesForm />
                  <Modal.Footer modalCloseText="Cancel">
                    <Button className="flex items-center gap-1">+ Add</Button>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Modal.Footer>

          </Modal.Content>
        </Modal>
      </BarChart>
    </AppLayout>
  );
};

export default App;
