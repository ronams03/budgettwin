
export interface FinancialDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cash: number;
}

export interface ScenarioInputs {
  revenueGrowth: number;
  newHires: number;
  marketingSpend: number;
}

export interface Kpi {
  title: string;
  value: number;
  previousValue: number;
  unit: 'currency' | 'months' | 'percentage';
}
