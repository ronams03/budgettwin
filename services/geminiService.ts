
import { GoogleGenAI } from "@google/genai";
import { FinancialDataPoint, ScenarioInputs } from '../types';
import { AVG_SALARY_PER_HIRE } from '../constants';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const formatDataForPrompt = (data: FinancialDataPoint[]) => {
    return data.map(d => `Month: ${d.month}, Revenue: $${d.revenue.toFixed(0)}, Expenses: $${d.expenses.toFixed(0)}, Profit: $${d.profit.toFixed(0)}, Cash: $${d.cash.toFixed(0)}`).join('\n');
};

export const generateFinancialAnalysis = async (
    baselineData: FinancialDataPoint[],
    simulatedData: FinancialDataPoint[],
    scenarioInputs: ScenarioInputs
): Promise<string> => {
    
    if (!process.env.API_KEY) {
        return Promise.resolve("AI analysis is disabled. Please configure your API key.");
    }

    const prompt = `
You are an expert financial analyst and CFO for a startup. Your task is to analyze a proposed financial scenario and provide a concise, actionable report in markdown format.

**Baseline Financials (Current Trajectory - Last 6 months):**
${formatDataForPrompt(baselineData)}

**Proposed "What-If" Scenario Changes:**
- Monthly Revenue Growth: Increase by ${scenarioInputs.revenueGrowth}%
- New Hires: ${scenarioInputs.newHires} (at an average cost of $${AVG_SALARY_PER_HIRE}/month each)
- Additional Monthly Marketing Spend: $${scenarioInputs.marketingSpend}

**Projected Financials (Next 12 months under this scenario):**
${formatDataForPrompt(simulatedData)}

**Your Task:**
Based on this data, provide a report with the following sections. Use markdown for formatting:

### Executive Summary
A brief overview of the scenario's impact on key metrics like cash runway, profitability, and overall financial health.

### 📈 Key Opportunities & Upsides
Identify the positive outcomes of this plan. What are the potential benefits?

### ⚠️ Potential Risks & Red Flags
What are the hidden dangers or risky assumptions in this scenario? Where could things go wrong?

### 💡 Actionable Recommendations
Suggest 2-3 concrete actions to mitigate the risks or enhance the opportunities identified. Be specific and tactical.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating financial analysis:", error);
        return "An error occurred while generating the AI analysis. Please check the console for details.";
    }
};
