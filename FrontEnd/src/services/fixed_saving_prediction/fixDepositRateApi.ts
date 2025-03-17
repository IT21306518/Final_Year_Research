import { EconomicIndicators, PredictionResponse } from "@/types/fix-rate-types";

export async function predictFixedDepositRate(
  indicators: EconomicIndicators
): Promise<PredictionResponse> {
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(indicators),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data: PredictionResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error predicting fixed deposit rate:", error);
    throw error;
  }
}
