export type TDatasets = 'pets' | 'planet';

export interface TDataRaw {
  GPU_mem: number;
  dataset: TDatasets;
  error_rate: number;
  fit_time: number;
  learning_rate: number;
  family: string;
  model_name: string;
  pool: string;
  train_loss: number;
  valid_loss: number;
}

export interface TData {
  idx: number;
  dataset: TDatasets;
  family: string;
  model_name: string;
  error_rate: number;
  fit_time: number;
  GPU_mem: number;
  score: number;
}
