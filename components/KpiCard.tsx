
import React from 'react';
import { Kpi } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './Icons';

interface KpiCardProps {
  kpi: Kpi;
  icon: React.ReactNode;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
};

const KpiCard: React.FC<KpiCardProps> = ({ kpi, icon }) => {
    const { title, value, previousValue, unit } = kpi;
    const isInfinite = !isFinite(value);
    const diff = isInfinite ? 0 : value - previousValue;
    const isPositive = (title.includes('Runway') || title.includes('Profit')) ? diff >= 0 : diff <= 0;
    
    let formattedValue: string;
    if(isInfinite) {
        formattedValue = '∞';
    } else {
        formattedValue = unit === 'currency' ? formatCurrency(value) : `${value.toFixed(1)} ${unit === 'months' ? 'mo' : '%'}`;
    }

    const diffPercentage = previousValue !== 0 && !isInfinite ? (diff / Math.abs(previousValue)) * 100 : 0;

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{formattedValue}</p>
        {!isInfinite && (
             <div className={`flex items-center text-xs mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                <span>{diffPercentage.toFixed(1)}% vs Baseline</span>
            </div>
        )}
      </div>
      <div className="bg-gray-700/50 p-2 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default KpiCard;
