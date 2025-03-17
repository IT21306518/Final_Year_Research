// Dataset Info Type
export type DatasetInfo = {
  source: string;
  test_samples: number;
  time_period: string;
  train_samples: number;
};

// Model Performance Type
export type ModelPerformance = {
  precision: number;
  recall: number;
};

// Draw Effect Type
export type DrawEffect = Record<string, number>;

// Race Distances Type
export type RaceDistances = Record<string, number>;

// Weight Handicap Type
export type WeightHandicap = Record<string, number>;

// Win Odds by Position Type
export type WinOddsByPosition = Record<string, number>;

// Stats Response Type
export type StatsResponse = {
  dataset_info: DatasetInfo;
  draw_effect: DrawEffect;
  model_performance: ModelPerformance;
  race_distances: RaceDistances;
  weight_handicap: WeightHandicap;
  win_odds_by_position: WinOddsByPosition;
};

// Correlation Response Type
export type CorrelationData = Record<string, Record<string, number>>;

// Horse Type
export type Horse = {
  horse_id: string;
  horse_number: number;
  horse_name: string;
  draw: number;
  actual_weight: number;
  declared_horse_weight: number;
  jockey_name: string;
  recent_ave_rank: number;
  jockey_ave_rank: number;
  win_odds: number;
  race_distance: number;
};

// Prediction Request Type
export type PredictionRequest = {
  race_id: string;
  race_date: string;
  race_venue: string;
  race_distance: number;
  horses: Horse[];
};

// Prediction Response Type
export type PredictionResponse = {
  best_bet: Horse & { win_probability: number; recommended_bet: boolean };
  predictions: (Horse & {
    win_probability: number;
    recommended_bet: boolean;
  })[];
  race_id: string;
};
