export interface Project {
  slug: string; number: string; title: string; category: string; summary: string;
  status: string; tools: string[]; visual: string; visualLabel: string;
  problem: string; context: string; approach: string[]; takeaway: string; caveat: string; nextSteps: string[];
}
export const projects: Project[] = [
  {
    slug: "customer-segmentation", number: "01", title: "Customer segmentation & behavioural analysis",
    category: "Product & Growth", summary: "Using transaction and behavioural patterns to understand customer groups and frame differentiated engagement strategies.",
    status: "Independent analytical project", tools: ["Python", "Pandas", "Scikit-learn", "K-Means", "PCA"],
    visual: "segments", visualLabel: "CUSTOMER COHORTS",
    problem: "How can a business move beyond one-size-fits-all customer communication?",
    context: "The project explores customer segmentation using a large transaction dataset. The analytical objective is to find interpretable behavioural groupings that can inform targeting and retention hypotheses.",
    approach: ["Inspect transaction grain, missingness, duplicates and customer-level coverage.", "Aggregate behavioural features at a clearly defined customer level.", "Scale suitable features and explore K-Means clustering.", "Use PCA as a dimensionality-reduction aid for visual inspection.", "Profile clusters and translate differences into testable business hypotheses."],
    takeaway: "Segmentation is useful only when the resulting groups are stable, interpretable and actionable. Cluster labels are descriptions of observed patterns—not proof that a marketing intervention will work.",
    caveat: "Cluster counts, uplift, revenue impact and model-quality metrics are not published here because verified result tables and experiment evidence have not been attached to this portfolio build.",
    nextSteps: ["Validate cluster stability across samples and time periods.", "Compare segments against retention and contribution metrics.", "Design a controlled campaign test before claiming business impact."]
  },
  {
    slug: "market-regime-vwap", number: "02", title: "Market regime & VWAP execution analysis",
    category: "Financial Analytics", summary: "A structured look at market context, VWAP behaviour and execution quality across different intraday conditions.",
    status: "Independent analytical project", tools: ["Python", "Pandas", "Market data", "VWAP", "Risk analysis"],
    visual: "markets", visualLabel: "MARKET REGIMES",
    problem: "Does an execution rule behave consistently across different market environments?",
    context: "This work focuses on intraday VWAP as an execution reference and the importance of separating market-regime classification from signal and execution rules.",
    approach: ["Define the instrument, session boundaries and data frequency.", "Calculate VWAP and relevant price-distance features.", "Create interpretable regime descriptors using trend and volatility context.", "Compare signal and execution behaviour across regimes.", "Evaluate transaction costs, drawdown and risk before interpreting returns."],
    takeaway: "A signal that looks attractive in aggregate may behave very differently across market regimes. Execution assumptions and risk controls are essential parts of the analysis.",
    caveat: "This case study describes the analytical workflow. It does not claim a verified profitable strategy, live trading performance or specific return/drawdown figures.",
    nextSteps: ["Use chronological out-of-sample testing.", "Model spread, slippage, fees and market impact.", "Report trade distribution, drawdown and regime-level performance."]
  },
  {
    slug: "trading-strategy-backtesting", number: "03", title: "Trading strategy backtesting",
    category: "Finance & Risk", summary: "A systematic workflow for evaluating rule-based strategies with historical market data, explicit assumptions and risk-aware reporting.",
    status: "Independent analytical project", tools: ["Python", "Pandas", "Yahoo Finance", "Backtesting", "Risk metrics"],
    visual: "backtest", visualLabel: "STRATEGY TESTING",
    problem: "How can a trading idea be evaluated without confusing a historical fit with a repeatable edge?",
    context: "The project explores historical strategy evaluation and the importance of defining entry, exit, sizing and transaction-cost assumptions before comparing outcomes.",
    approach: ["Write the trading rules in unambiguous, testable terms.", "Acquire and validate historical price data.", "Apply signals without using future information.", "Include fees, slippage and position-sizing rules.", "Review returns alongside drawdown, exposure and trade-level outcomes."],
    takeaway: "A backtest is a research tool, not a promise of future performance. A strategy must survive out-of-sample testing, realistic execution costs and risk analysis.",
    caveat: "No return, Sharpe ratio, win rate or maximum drawdown is asserted in this portfolio until the underlying reproducible output is linked and verified.",
    nextSteps: ["Add a reproducible notebook and strategy configuration.", "Compare in-sample and out-of-sample periods.", "Run sensitivity tests for costs and position sizing."]
  },
  {
    slug: "real-time-market-dashboard", number: "04", title: "Real-time market monitoring dashboard",
    category: "Business Intelligence", summary: "A browser-oriented market monitoring concept using live-data interfaces, price visualisation and a compact set of market indicators.",
    status: "Independent project", tools: ["Python", "Streamlit", "Plotly", "yfinance"],
    visual: "dashboard", visualLabel: "MARKET MONITOR",
    problem: "How can market information be consolidated into a quick, readable monitoring interface?",
    context: "The dashboard concept brings price series and selected indicators into a single view, helping a user monitor market movement without switching between multiple tools.",
    approach: ["Retrieve market price data from a data provider.", "Prepare and validate timestamps and price fields.", "Display price movement and selected technical indicators.", "Keep the visual hierarchy focused on monitoring rather than prediction.", "Make data freshness and provider limitations visible."],
    takeaway: "A monitoring dashboard should reduce cognitive load and make the state of the market easier to inspect. It should not imply that visual indicators alone provide a trading edge.",
    caveat: "The interactive dashboard on this portfolio's Dashboards page uses illustrative sample values and is not connected to a live brokerage or market-data feed.",
    nextSteps: ["Connect a supported market-data API with clear rate-limit handling.", "Add instrument and timeframe selection.", "Display source, last-updated time and missing-data warnings."]
  }
];
