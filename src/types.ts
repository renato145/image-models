export interface TData {
  idx: number;
  model: string;
  top1: number;
  top1_err: number;
  top5: number;
  top5_err: number;
  param_count: number;
  img_size: number;
  cropt_pct: number;
  interpolation: string;
}
