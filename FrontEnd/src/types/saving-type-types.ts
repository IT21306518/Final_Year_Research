export interface PredictionRequest {
  age: number;
  stability_vs_risk_preference: number;
  investment_duration_years: number;
  investment_amount: number;
}

export interface PredictionResponse {
  prediction: string;
}
