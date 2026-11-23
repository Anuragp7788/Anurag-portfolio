export interface Project {
  slug: string; number: string; title: string; category: string; summary: string;
  status: string; tools: string[]; visual: string; visualLabel: string;
  repoUrl?: string; dashboardUrl?: string;
  problem: string; context: string; approach: string[]; takeaway: string; caveat: string; nextSteps: string[];
}
export const projects: Project[] = [
  {
    slug: "retail-profitability-inventory-intelligence", number: "01",
    title: "Retail sales, profitability & inventory intelligence",
    category: "Business Intelligence",
    summary: "A multi-page Power BI case study analysing retail sales, profitability, returns and a latest product–store inventory snapshot.",
    status: "Power BI report built · local validation completed for core sales and inventory visuals",
    tools: ["Power BI", "DAX", "Power Query", "Python", "SQL", "Excel", "Pandas"],
    visual: "dashboard", visualLabel: "RETAIL INTELLIGENCE",
    repoUrl: "https://github.com/Anuragp7788/retail-profitability-inventory-intelligence",
    problem: "How can retail decision-makers understand commercial performance, identify weak-margin sales types and inspect stock exposure across products and stores?",
    context: "This independent case study uses supplied retail sales and inventory CSV files in a fictional multi-store retail scenario. The sales file contains 125,751 transaction rows and the inventory file contains 284,755 historical records. The analysis treats sales performance and the latest inventory position as distinct analytical views; it does not claim a causal link between them or represent results from a real client.",
    approach: [
      "Profile the two source files, inspect field types and document the data grain and known limitations.",
      "Build sales measures that exclude return rows from gross sales, COGS, profit and units sold while reporting returns separately.",
      "Create a Power BI semantic model with date, product and store dimensions, plus a latest product–store inventory snapshot.",
      "Build five report pages covering executive performance, sales profitability, inventory health, product/store performance and returns.",
      "Validate key sales measures against independent calculations from the supplied CSV files.",
      "Classify latest product–store records as negative, zero or positive stock and reconcile the category counts."
    ],
    takeaway: "Verified sales results show 11.22M in sales excluding returns, 4.96M calculated profit and a 44.23% calculated margin. Sales-type analysis highlights materially weaker economics in clearance and Markdown Tier 2 than in full-price sales. The inventory snapshot contains 60,968 product–store pairs: 703 negative-stock, 8,406 zero-stock and 51,859 positive-stock records.",
    caveat: "This is an independent portfolio exercise using supplied dataset files, not paid client work or verified performance from a named retailer. The source provenance/licence should be confirmed before redistributing the raw data. Return-reason analysis is unavailable because the Reason of Return field is blank. The Sales Channel field contains only Channel Alpha. Inventory stock-cover, replenishment and causal discount-impact claims are not made. The Power BI report has been opened and visually checked locally; a public interactive Power BI embed is not currently linked.",
    nextSteps: [
      "Publish the PBIP project, data dictionary, metric definitions and reproducible validation scripts in the repository without exposing restricted raw data.",
      "Capture clean, full-resolution screenshots of all five report pages and add them to the case study.",
      "Reconcile inventory valuation and snapshot measures with a separate Python audit before publishing those values as headline findings.",
      "Add a public interactive dashboard only after choosing an appropriate hosting and data-access method."
    ]
  },
  {
    slug: "customer-segmentation", number: "02", title: "Customer segmentation & behavioural analysis",
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
    slug: "market-regime-vwap", number: "03", title: "Market regime & VWAP execution analysis",
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
    slug: "trading-strategy-backtesting", number: "04", title: "Trading strategy backtesting",
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
    slug: "real-time-market-dashboard", number: "05", title: "Real-time market monitoring dashboard",
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
