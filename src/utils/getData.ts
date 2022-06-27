import { csv, flatRollup, min } from 'd3';
import type { TData, TDatasets } from '../types';

const pat = /^([a-z]+?(?:v2)?)(?:\d|_|$)/;

export async function getData(): Promise<TData[]> {
  const rawData = await csv(
    'https://gist.githubusercontent.com/jph00/959aaf8695e723246b5e21f3cd5deb02/raw/sweep.csv',
    (row) => {
      const family = row.model_name.match(pat)[1];
      return {
        GPU_mem: +row.GPU_mem,
        dataset: row.dataset as TDatasets,
        error_rate: +row.error_rate,
        fit_time: +row.fit_time,
        learning_rate: +row.learning_rate,
        family: family === 'swinv2' ? 'swin' : family,
        model_name: row.model_name,
        pool: row.pool,
        train_loss: +row.train_loss,
        valid_loss: +row.valid_loss
      };
    }
  );

  const data = flatRollup(
    rawData,
    (d) => {
      const error_rate = min(d, (d) => d.error_rate);
      const fit_time = min(d, (d) => d.fit_time);
      const GPU_mem = min(d, (d) => d.GPU_mem);
      return {
        error_rate,
        fit_time,
        GPU_mem,
        score: error_rate * (fit_time + 80)
      };
    },
    (d) => d.dataset,
    (d) => d.family,
    (d) => d.model_name
  ).map(([dataset, family, model_name, d], idx) => ({
    idx,
    dataset,
    family,
    model_name,
    ...d
  }));

  console.log(data.length);
  
  return data;
}
