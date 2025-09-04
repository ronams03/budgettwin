
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FinancialDataPoint } from '../types';

interface CashFlowChartProps {
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
        <p style={{ color: '#8884d8' }}>{`Baseline: ${formatCurrency(payload[0].value)}`}</p>
        <p style={{ color: '#22d3ee' }}>{`Scenario: ${formatCurrency(payload[1].value)}`}</p>
      </div>
    );
  }
  return null;
};

const CashFlowChart: React.FC<CashFlowChartProps> = ({ baselineData, simulatedData }) => {
  const combinedData = baselineData.map((base, index) => ({
    month: base.month,
    baselineCash: base.cash,
    simulatedCash: simulatedData[index]?.cash,
  }));

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-6 h-96">
        <h3 className="text-lg font-bold text-white mb-4">Cash Flow Projection</h3>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="month" stroke="#a0aec0" tick={{ fontSize: 12 }} />
                <YAxis stroke="#a0aec0" tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <Line type="monotone" dataKey="baselineCash" name="Baseline" stroke="#8884d8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="simulatedCash" name="Scenario" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
