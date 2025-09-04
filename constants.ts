
import { FinancialDataPoint, ScenarioInputs } from './types';

export const INITIAL_SCENARIO: ScenarioInputs = {
  revenueGrowth: 5,
  newHires: 1,
  marketingSpend: 5000,
};

export const AVG_SALARY_PER_HIRE = 8000; // Monthly cost
export const FORECAST_MONTHS = 12;

export const BASELINE_DATA: FinancialDataPoint[] = [
  { month: 'Jan', revenue: 100000, expenses: 70000, profit: 30000, cash: 200000 },
  { month: 'Feb', revenue: 105000, expenses: 72000, profit: 33000, cash: 233000 },
  { month: 'Mar', revenue: 110000, expenses: 75000, profit: 35000, cash: 268000 },
  { month: 'Apr', revenue: 112000, expenses: 76000, profit: 36000, cash: 304000 },
  { month: 'May', revenue: 118000, expenses: 78000, profit: 40000, cash: 344000 },
  { month: 'Jun', revenue: 125000, expenses: 80000, profit: 45000, cash: 389000 },
];
