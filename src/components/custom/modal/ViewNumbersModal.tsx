import { Each } from '@/components/utils';
import { CustomModal, CustomModalContent, CustomModalFooter } from './CustomModal';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { BarChartData } from '@/interfaces/chart';
import { Button } from '@/components/ui/button';

interface ViewNumbersModalProps {
  openViewModal: boolean;
  handleAddModalOpen: () => void;
  handleViewModalClose: () => void;
  openAddModal: boolean;
  chartData: Array<BarChartData>;
}

const formatter = new Intl.NumberFormat('en-US');

export const ViewNumbersModal: React.FC<Readonly<ViewNumbersModalProps>> = ({
  openViewModal,
  handleViewModalClose,
  handleAddModalOpen,
  openAddModal,
  chartData,
}) => {
  const viewModalVariants = useMemo(
    () => ({
      hidden: { opacity: 0.75, translateX: '-50%', scale: 0.975 },
      visible: { opacity: 1, translateX: '-50%', scale: 1 },
      exit: { opacity: 0.75, translateX: '-50%', scale: 0.975 },
    }),
    []
  );

  return (
    <CustomModal open={openViewModal} onClose={handleViewModalClose}>
      <CustomModalContent
        modalTitle="Year Sales Numbers"
        open={openViewModal}
        onClose={handleViewModalClose}
        animationVariants={viewModalVariants}
        classnames={cn({
          '!scale-95 !-translate-x-1/2': openAddModal,
        })}
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
        <CustomModalFooter onClose={handleViewModalClose}>
          <Button className="flex items-center gap-1" onClick={handleAddModalOpen}>
            + Add More Numbers
          </Button>
        </CustomModalFooter>
      </CustomModalContent>
    </CustomModal>
  );
};
