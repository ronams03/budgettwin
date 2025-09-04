
import React, { useState, useEffect, useCallback } from 'react';
import { FinancialDataPoint, ScenarioInputs, Kpi } from '../types';
import { BASELINE_DATA, INITIAL_SCENARIO, FORECAST_MONTHS, AVG_SALARY_PER_HIRE } from '../constants';
import ScenarioControls from './ScenarioControls';
import KpiCard from './KpiCard';
import CashFlowChart from './CashFlowChart';
import ProfitLossChart from './ProfitLossChart';
import AiSuggestions from './AiSuggestions';
import { generateFinancialAnalysis } from '../services/geminiService';
import { CashIcon, ChartBarIcon, ClockIcon } from './Icons';

const generateProjection = (
  base: FinancialDataPoint[],
  scenario: ScenarioInputs
): FinancialDataPoint[] => {
  const projection: FinancialDataPoint[] = [];
  let lastDataPoint = base[base.length - 1];

  const monthNames = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  for (let i = 0; i < FORECAST_MONTHS; i++) {
    const newRevenue = lastDataPoint.revenue * (1 + scenario.revenueGrowth / 100);
    const newBaseExpenses = lastDataPoint.expenses * 1.01; // small inflation
    const newHireCosts = scenario.newHires * AVG_SALARY_PER_HIRE;
    const newExpenses = newBaseExpenses + newHireCosts + scenario.marketingSpend;
    const newProfit = newRevenue - newExpenses;
    const newCash = lastDataPoint.cash + newProfit;

    const newDataPoint = {
      month: monthNames[i % 12],
      revenue: newRevenue,
      expenses: newExpenses,
      profit: newProfit,
      cash: newCash,
    };
    projection.push(newDataPoint);
    lastDataPoint = newDataPoint;
  }
  return projection;
};

const calculateKpis = (data: FinancialDataPoint[]): { burnRate: number; runway: number } => {
    const lastMonth = data[data.length - 1];
    const avgNegativeProfit = data
        .filter(d => d.profit < 0)
        .reduce((sum, d) => sum + d.profit, 0) / (data.filter(d => d.profit < 0).length || 1);

    const burnRate = avgNegativeProfit === 0 ? 0 : -avgNegativeProfit;
    const runway = burnRate > 0 ? lastMonth.cash / burnRate : Infinity;

    return { burnRate, runway };
};


function Dashboard() {
  const [scenario, setScenario] = useState<ScenarioInputs>(INITIAL_SCENARIO);
  const [baselineProjection, setBaselineProjection] = useState<FinancialDataPoint[]>([]);
  const [simulatedProjection, setSimulatedProjection] = useState<FinancialDataPoint[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  useEffect(() => {
    const baseProj = generateProjection(BASELINE_DATA, { revenueGrowth: 2, newHires: 0, marketingSpend: 0 });
    setBaselineProjection(baseProj);
  }, []);

  useEffect(() => {
    const simProj = generateProjection(BASELINE_DATA, scenario);
    setSimulatedProjection(simProj);
  }, [scenario]);

  const handleScenarioChange = useCallback((newScenario: Partial<ScenarioInputs>) => {
    setScenario(prev => ({ ...prev, ...newScenario }));
  }, []);

  const handleAnalyze = async () => {
    setIsAiLoading(true);
    setAiAnalysis('');
    const analysis = await generateFinancialAnalysis(BASELINE_DATA, simulatedProjection, scenario);
    setAiAnalysis(analysis);
    setIsAiLoading(false);
  };
  
  const baselineKpis = calculateKpis(baselineProjection.length > 0 ? baselineProjection : BASELINE_DATA);
  const simulatedKpis = calculateKpis(simulatedProjection.length > 0 ? simulatedProjection : BASELINE_DATA);


  const kpiData: Kpi[] = [
    { title: 'Cash Runway', value: simulatedKpis.runway, previousValue: baselineKpis.runway, unit: 'months' },
    { title: 'Net Burn Rate', value: simulatedKpis.burnRate, previousValue: baselineKpis.burnRate, unit: 'currency' },
    { title: 'End of Year Profit', value: simulatedProjection[simulatedProjection.length - 1]?.profit || 0, previousValue: baselineProjection[baselineProjection.length - 1]?.profit || 0, unit: 'currency' },
  ];

  const icons = [<ClockIcon className="h-8 w-8 text-cyan-400" />, <CashIcon className="h-8 w-8 text-cyan-400" />, <ChartBarIcon className="h-8 w-8 text-cyan-400" />];

  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8">
      <aside className="w-full lg:w-1/3 lg:max-w-sm xl:max-w-md flex-shrink-0">
        <ScenarioControls 
            scenario={scenario} 
            onScenarioChange={handleScenarioChange} 
            onAnalyze={handleAnalyze}
            isAiLoading={isAiLoading}
        />
      </aside>
      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {kpiData.map((kpi, index) => (
             <KpiCard key={kpi.title} kpi={kpi} icon={icons[index]} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <CashFlowChart baselineData={baselineProjection} simulatedData={simulatedProjection} />
          <ProfitLossChart baselineData={baselineProjection} simulatedData={simulatedProjection} />
        </div>
        
        <AiSuggestions analysis={aiAnalysis} isLoading={isAiLoading} />
      </main>
    </div>
  );
}

export default Dashboard;
