import { BarChartData } from './chart';

export interface SalesFormProps {
  lastYear: number;
  setChartData: React.Dispatch<React.SetStateAction<Array<BarChartData>>>;
  handleAddModalClose: () => void;
}
