export interface SavingsRateParams {
  starting_saving_rate: number;
  ending_saving_rate: number;
  sdf_rate: number;
  slf_rate: number;
  usd_to_lkr: number;
  lkr_to_usd: number;
  inflation_forecast: number;
  gdp_forecast: number;
  core_inflation: number;
  gdp_growth_rate: number;
}

export interface BatchScenario extends SavingsRateParams {
  scenario_name?: string;
}
export interface SavingsRateResponse {
  predicted_savings_rate: number;
  input_parameters: SavingsRateParams;
}

export interface BatchPredictionResponse extends SavingsRateResponse {
  scenario_name?: string;
}
