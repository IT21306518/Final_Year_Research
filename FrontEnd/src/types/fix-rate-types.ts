export interface EconomicIndicators {
  usd_to_lkr: number;
  inflation_forecast: number;
  gdp_forecast: number;
  core_inflation: number;
  gdp_growth_rate: number;
  unemployment_rate: number;
  foreign_reserves: number;
  consumer_confidence: number;
  policy_rate: number;
  treasury_bill_rate: number;
  money_supply_growth: number;
  bop_current_account: number;
  government_debt_to_gdp: number;
}

export interface PredictionResponse {
  predicted_fixed_deposit_rate: number;
}
