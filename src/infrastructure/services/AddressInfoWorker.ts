// const threadPool = require('webworker-threads');
import AddressInfoTask from '../../core/models/AddressInfoTask';
// import AddressInfoResult from '../../core/models/AddressInfoResult';

const processAddressInfo = async function(taskMessage: string): Promise<AddressInfoTask> {
    // console.log(`starting to process task ${task.providerKey}`);

    const task = JSON.parse(taskMessage);

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