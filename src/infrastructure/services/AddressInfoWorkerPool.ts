import AddressInfoTask from '../../core/models/AddressInfoTask';
import AddressInfoResult from '../../core/models/AddressInfoResult';
const wt = require('worker-thread');

const processAddressInfo = async function(task: AddressInfoTask): Promise<AddressInfoTask> {
  // console.log(`starting to process task ${task.providerKey}`);

  try {
    const providerPath = `../providers/${task.provider}`;
    // console.log(`providerpath ${providerPath} `);
    const handler = await import(providerPath);
    // console.log(`imported handler ${handler.getAddressInfo}`);
    if (handler) {
      const results = await handler.getAddressInfo(task.address);
      //   console.log(`get results ${results}`);
      task.data = results;
    }
  } catch (error) {
    task.data = 'error occurred';
  }

  return task;
};

export default class AddressInfoWorkerPool {
  workerCount: any;
  constructor(workers: number) {
    this.workerCount = workers;
  }

  public async processTasks(tasks: AddressInfoTask[]): Promise<any> {
    const ch = wt.createChannel(processAddressInfo, this.workerCount);
    return new Promise((res, rej) => {
      const results: AddressInfoResult[] = [];

      try {
        ch.on('done', (err: any, result: any) => {
          if (err) {
            console.error(err);
          }

          results.push({
            key: result.providerKey,
            data: result.data
          });
        });

        ch.on('stop', () => {
          console.log('channel is stopped');

          res(results);
        });

        tasks.forEach(t => {
          ch.add(t);
        });

        ch.execute();
      } catch (error) {
        rej(error);
      }
    });
  }
}
