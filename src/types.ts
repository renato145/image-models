export interface TData {
  idx: number;
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

export type TDatasets = 'pets' | 'planet';
