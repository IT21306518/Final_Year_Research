import {
  PredictionRequest,
  PredictionResponse,
} from "@/types/saving-type-types";

export const getSavingsType = async (formData: PredictionRequest) => {
  try {
    const response = await fetch("http://localhost:5005/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = (await response.json()) as PredictionResponse;
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
