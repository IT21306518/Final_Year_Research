import {
  BatchPredictionResponse,
  BatchScenario,
  SavingsRateParams,
  SavingsRateResponse,
} from "@/types/savings-types";

const API_URL = "http://localhost:5001";

export const SavingsRateService = {
  /**
   * Predict savings rate based on economic parameters
   * @param params Economic parameters
   * @returns Predicted savings rate with input parameters
   */
  async predictSavingsRate(
    params: SavingsRateParams
  ): Promise<SavingsRateResponse> {
    try {
      const response = await fetch(`${API_URL}/predict-savings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to predict savings rate");
      }

      return (await response.json()) as SavingsRateResponse;
    } catch (error) {
      console.error("Error predicting savings rate:", error);
      throw error;
    }
  },

  /**
   * Predict savings rates for multiple scenarios
   * @param scenarios Array of economic scenarios
   * @returns Array of predictions with input parameters
   */
  async batchPredictSavingsRates(
    scenarios: BatchScenario[]
  ): Promise<BatchPredictionResponse[]> {
    try {
      const response = await fetch(`${API_URL}/predict-savings/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scenarios),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to predict batch savings rates"
        );
      }

      return (await response.json()) as BatchPredictionResponse[];
    } catch (error) {
      console.error("Error predicting batch savings rates:", error);
      throw error;
    }
  },
};
