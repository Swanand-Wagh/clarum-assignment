import { BarChartData } from './chart';

export interface SalesFormProps {
  lastYear: number;
  setChartData: React.Dispatch<React.SetStateAction<Array<BarChartData>>>;
  setOpenAddNumbersModal: React.Dispatch<React.SetStateAction<boolean>>;
}
