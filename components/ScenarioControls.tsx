
import React from 'react';
import { ScenarioInputs } from '../types';
import { BrainIcon } from './Icons';

interface ScenarioControlsProps {
  scenario: ScenarioInputs;
  onScenarioChange: (newScenario: Partial<ScenarioInputs>) => void;
  onAnalyze: () => void;
  isAiLoading: boolean;
}

const SliderInput: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, step, unit, onChange }) => (
  <div className="space-y-2">
    <label className="flex justify-between items-baseline text-sm font-medium text-gray-300">
      <span>{label}</span>
      <span className="text-cyan-400 font-semibold">{value}{unit}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      style={{
         background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`
      }}
    />
  </div>
);

const NumberInput: React.FC<{
    label: string;
    value: number;
    step: number;
    unit: string;
    onChange: (value: number) => void;
}> = ({ label, value, step, unit, onChange}) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{unit}</span>
            <input
                type="number"
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-800 border-gray-700 rounded-md pl-7 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
            />
        </div>
    </div>
);


const ScenarioControls: React.FC<ScenarioControlsProps> = ({ scenario, onScenarioChange, onAnalyze, isAiLoading }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 space-y-6 sticky top-24">
      <h2 className="text-xl font-bold text-white">What-If Scenario Simulator</h2>
      
      <SliderInput
        label="Monthly Revenue Growth"
        value={scenario.revenueGrowth}
        min={-10}
        max={20}
        step={0.5}
        unit="%"
        onChange={(value) => onScenarioChange({ revenueGrowth: value })}
      />

      <SliderInput
        label="New Hires"
        value={scenario.newHires}
        min={0}
        max={10}
        step={1}
        unit=""
        onChange={(value) => onScenarioChange({ newHires: value })}
      />
      
       <NumberInput
        label="Additional Marketing Spend"
        value={scenario.marketingSpend}
        step={500}
        unit="$"
        onChange={(value) => onScenarioChange({ marketingSpend: value })}
      />

      <button
        onClick={onAnalyze}
        disabled={isAiLoading}
        className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        <BrainIcon className="h-5 w-5 mr-2" />
        {isAiLoading ? 'Analyzing...' : 'Generate AI Analysis'}
      </button>
    </div>
  );
};

export default ScenarioControls;
