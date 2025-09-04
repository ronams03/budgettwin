
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { FinancialDataPoint } from '../types';

interface ProfitLossChartProps {
  baselineData: FinancialDataPoint[];
  simulatedData: FinancialDataPoint[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 0
    }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-sm">
        <p className="label font-bold text-white">{`${label}`}</p>
        <p style={{ color: '#82ca9d' }}>{`Baseline: ${formatCurrency(payload[0].value)}`}</p>
        <p style={{ color: '#fb923c' }}>{`Scenario: ${formatCurrency(payload[1].value)}`}</p>
      </div>
    );
  }
  return null;
};


const ProfitLossChart: React.FC<ProfitLossChartProps> = ({ baselineData, simulatedData }) => {
  const combinedData = baselineData.map((base, index) => ({
    month: base.month,
    baselineProfit: base.profit,
    simulatedProfit: simulatedData[index]?.profit,
  }));

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-6 h-96">
        <h3 className="text-lg font-bold text-white mb-4">Profit & Loss Projection</h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={combinedData} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="month" stroke="#a0aec0" tick={{ fontSize: 12 }} />
                <YAxis stroke="#a0aec0" tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <Bar dataKey="baselineProfit" name="Baseline" fill="#82ca9d">
                  {combinedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.baselineProfit >= 0 ? '#4ade80' : '#f87171'} />
                  ))}
                </Bar>
                <Bar dataKey="simulatedProfit" name="Scenario" fill="#fb923c">
                    {combinedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.simulatedProfit >= 0 ? '#fb923c' : '#ef4444'} />
                  ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ProfitLossChart;
