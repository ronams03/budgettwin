# BudgetTwin - AI Financial Simulator

BudgetTwin is a powerful, AI-driven financial digital twin designed for businesses. It acts as a "SimCity for your company's finances," allowing you to simulate complex financial scenarios and receive instant, intelligent feedback on their potential impact.

This interactive web application provides a simplified demonstration of the core concept, enabling users to adjust key business levers and see the future consequences in real-time.

## ✨ Core Features

-   **What-If Scenario Simulator**: Use intuitive sliders and inputs to dynamically adjust critical business drivers:
    -   Monthly Revenue Growth (%)
    -   New Hires (Count)
    -   Additional Monthly Marketing Spend ($)
-   **Real-Time Financial Projections**: Instantly see how your decisions impact financial forecasts over a 12-month period. The application projects crucial data for cash flow, profit, and loss.
-   **Key Performance Indicator (KPI) Dashboard**: At a glance, track critical metrics that define your business's health:
    -   **Cash Runway**: How many months until you run out of money.
    -   **Net Burn Rate**: The rate at which the company is losing money.
    -   **End of Year Profit**: The projected profit at the end of the 12-month simulation.
    Each KPI is compared against a baseline trajectory to highlight the true impact of your scenario.
-   **Interactive Visualizations**: Powered by Recharts, the dashboard includes two dynamic charts:
    -   **Cash Flow Projection**: A line chart comparing the baseline cash balance against your simulated scenario.
    -   **Profit & Loss Projection**: A bar chart visualizing the monthly profit or loss for both the baseline and the scenario.
-   **AI Smart Suggestions (Powered by Gemini)**: With a single click, leverage the power of Google's Gemini model to generate a detailed financial analysis. The report includes:
    -   An **Executive Summary** of the scenario's impact.
    -   A breakdown of **Key Opportunities & Upsides**.
    -   An analysis of **Potential Risks & Red Flags**.
    -   **Actionable Recommendations** to mitigate risks and capitalize on opportunities.

## 🚀 How to Use

1.  **Adjust the Levers**: Interact with the controls in the **What-If Scenario Simulator** panel on the left side of the screen.
2.  **Observe the Impact**: As you modify the inputs, watch the KPIs and charts update instantly to reflect your changes.
3.  **Generate AI Analysis**: Once you've created a scenario you want to explore further, click the **"Generate AI Analysis"** button.
4.  **Review Insights**: Read the AI-generated report in the **AI Smart Suggestions** panel to gain a deeper strategic understanding of your decisions.

## 🛠️ Technology Stack

-   **Frontend**: React & TypeScript
-   **Styling**: Tailwind CSS
-   **Charting**: Recharts
-   **AI Engine**: Google Gemini API (`gemini-2.5-flash`)
