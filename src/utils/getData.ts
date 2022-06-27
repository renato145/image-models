import { csv, rollup, min } from 'd3';
import type { TData, TDatasets } from '../types';

export async function getData(): Promise<TData[]> {
  const data = await csv(
    'https://gist.githubusercontent.com/jph00/959aaf8695e723246b5e21f3cd5deb02/raw/sweep.csv',
    (row, idx) => {
      return {
        idx,
        GPU_mem: +row.GPU_mem,
        dataset: row.dataset as TDatasets,
        error_rate: +row.error_rate,
        fit_time: +row.fit_time,
        learning_rate: +row.learning_rate,
		family: 'asdasd',
        model_name: row.model_name,
        pool: row.pool,
        train_loss: +row.train_loss,
        valid_loss: +row.valid_loss
      };
    }
  );

  //   df['family'] = df.model_name.str.extract('^([a-z]+?(?:v2)?)(?:\d|_|$)')
  // df.loc[df.family=='swinv2', 'family'] = 'swin'
  // pt_all = df.pivot_table(values=['error_rate','fit_time','GPU_mem'], index=['dataset', 'family', 'model_name'],
  //                         aggfunc=np.min).reset_index()
  // pt_all['score'] = pt_all.error_rate*(pt_all.fit_time+80)``

  const d = rollup(
    data,
    (d) => ({
      error_rate: min(d, (d) => d.error_rate),
      fit_time: min(d, (d) => d.fit_time),
      GPU_mem: min(d, (d) => d.GPU_mem)
    }),
    (d) => d.dataset,
    (d) => d.model_name
  );
  //   const dd = Array.from(d)
  console.log(d);
  console.log(d.get('pets'));
  console.log(d.get('pets').get('efficientnetv2_rw_t'));

  return data;
}
