import React, { useMemo } from 'react';
import { CustomModal, CustomModalContent } from './CustomModal';
import { SalesForm } from '../form';
import { BarChartData } from '@/interfaces/chart';

interface AddNumbersModalProps {
  openAddModal: boolean;
  handleAddModalClose: () => void;
  lastYear: number;
  setChartData: React.Dispatch<React.SetStateAction<Array<BarChartData>>>;
}

export const AddNumbersModal: React.FC<Readonly<AddNumbersModalProps>> = ({
  handleAddModalClose,
  lastYear,
  openAddModal,
  setChartData,
}) => {
  const addModalVariants = useMemo(
    () => ({
      hidden: { opacity: 0.75, translateX: '-50%', translateY: 54 },
      visible: { opacity: 1, translateX: '-50%', translateY: 18 },
      exit: { opacity: 0.75, translateX: '-50%', translateY: 36 },
    }),
    []
  );

  return (
    <CustomModal open={openAddModal} onClose={handleAddModalClose} showOverlay={false}>
      <CustomModalContent
        modalTitle="Add More Numbers"
        open={openAddModal}
        onClose={handleAddModalClose}
        animationVariants={addModalVariants}
      >
        <p className="text-[15px] text-foreground/90">
          Add the total sales for the year <span className="font-semibold">{lastYear + 1}</span> below. By adding the
          sales for the year <span className="font-semibold">{lastYear + 1}</span>, you will be able to see the updated
          chart.
        </p>
        <SalesForm lastYear={lastYear} setChartData={setChartData} handleAddModalClose={handleAddModalClose} />
      </CustomModalContent>
    </CustomModal>
  );
};
