
# Investment Advisory System

## Overview

The **Investment Advisory System** is an intelligent, multi-agent system designed to assist users with informed investment decisions across multiple asset classes, including **Forex**, **Stocks**, and **Cryptocurrency**. The system provides comprehensive analyses, including market trends, economic news, risk assessment, and predictive models, offering personalized advice based on users' investment profiles and goals.

The system evaluates opportunities in **Forex**, **Stock Markets**, and **Crypto** and provides actionable insights to guide users in making strategic investment decisions. By leveraging advanced analytics and the latest data, the system supports various trading strategies and risk profiles.

## Features

### 1. **Market Analysis**
   - **Global Market Trends**: Analyze and evaluate overall trends in Forex, Stocks, and Crypto markets, focusing on price movements and market dynamics.
   - **Asset Class Analysis**: Perform detailed analysis on **Currency Pairs (Forex)**, **Stocks (Equity Markets)**, and **Cryptocurrencies** considering users' risk profiles and strategies.
   - **Technical and Fundamental Analysis**: In-depth analysis using technical indicators and economic fundamentals specific to each asset class.
   - **Interest Rate & Policy Analysis**: Examine the effects of central bank policies, interest rates, and regulatory changes on asset prices in Forex, Stocks, and Crypto markets.

### 2. **News & Event Analysis**
   - **Economic News**: Gather and analyze recent economic events, central bank decisions, and political developments that impact Forex, Stock, and Crypto markets.
   - **Geopolitical Impact**: Assess how geopolitical events influence the volatility of Forex pairs, stock markets, and crypto assets.
   - **Market Sentiment**: Evaluate market sentiment and risk appetite for each asset class, and determine their influence on market movements.

### 3. **Risk Assessment**
   - **Market Volatility & Risk**: Analyze risks associated with market volatility, price movements, and liquidity for Forex, Stocks, and Crypto assets.
   - **Leverage & Margin Risks**: Evaluate risks from leverage and margin trading across different asset classes.
   - **Political & Economic Risks**: Assess risks tied to political events and economic developments, specific to the region and asset class.
   - **Liquidity Risks**: Evaluate liquidity risks in different asset classes, with particular focus on Forex, Stocks, and Cryptocurrencies.

### 4. **Prediction & Forecasting**
   - **Asset Price Predictions**: Generate detailed predictions for future prices of **Forex**, **Stocks**, and **Crypto** using advanced machine learning models.
   - **Volatility Forecasting**: Predict future market volatility and create confidence intervals to gauge potential price swings.
   - **Extended Timeframe Predictions**: Offer predictions for various timeframes, aiding users in long-term strategic investment planning.

### 5. **Investment Advisory**
   - **Trading Strategy Recommendations**: Provide customized trading strategies tailored to the user's risk profile, investment amount, holding duration, and strategy keywords.
   - **Risk Mitigation Strategies**: Recommend specific risk management techniques to help minimize exposure while optimizing potential returns across different asset classes.
   - **Final Recommendations**: Deliver a comprehensive advisory report that includes a clear recommendation on whether to trade specific assets (Forex pairs, stocks, or crypto), including ideal entry/exit points and strategies.

## System Architecture

The system is designed with a task-based workflow, where each task focuses on specific objectives related to **Forex**, **Stocks**, or **Crypto**. The core components include:

- **Task Execution**: Tasks are executed independently and focus on different aspects such as market analysis, risk evaluation, predictions, and advisories for each asset class.
- **User Profiles**: Tailored investment recommendations are generated based on individual user inputs such as investment amount, risk profile, holding duration, and strategy preferences.
- **Prediction Models**: Advanced machine learning models are applied to predict price movements, volatility, and other relevant market dynamics across Forex, Stocks, and Crypto.
- **Reports & Visualizations**: Each task generates detailed reports, charts, and visualizations that summarize key findings, helping users understand market conditions and make informed decisions.

## Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/udithishanka/investment_advisory_system.git

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt

3. **Configure API keys in .env file**

4. **Initialize Server**
   ```bash
   cd server
   uvicorn app:app --reload --port 8081

5. **Initialize Client**
   ```bash
   cd client
   npm run dev

## Usage

### Example Input

To use the system, users need to provide details about their investment preferences:

- **Investment Type** : Select between Stocks, Crypto, Forex
- **Target Asset** : Stock symbol or Crypto Asset or Forex pair
- **Investment Amount**
- **Holding Duration**
- **Risk Profile**
- **Strategy Keywords**

### Example Output

A detailed advisory report, including:

- **Market analysis for Forex, Stocks, or Crypto**
- **Economic and political news impact analysis**
- **Technical and fundamental insights**
- **Risk assessments, volatility predictions, and price forecasts**
- **Trading recommendations with entry/exit points and risk management strategies**
- **Predictions and forecasts**

User can also chat with the system and ask questions about their investment, and view comparisons with other potential assets.

## License

This project is licensed under the MIT License.
