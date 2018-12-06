import AddressTaskBuilder from './infrastructure/services/AddressTaskBuilder';
import AddressInfoWorkerPool from './infrastructure/services/AddressInfoWorkerPool';
import AddressInfoTaskPool from './infrastructure/services/AddressInfoTaskPool';

// create a pool with two workers
// const taskPool =  new AddressInfoTaskPool(2);
// const taskPool = new AddressInfoWorkerPool(2);
const taskPool = new AddressInfoTaskPool(2);
const taskBuilder = new AddressTaskBuilder();
const tasks = taskBuilder.build("google.com", ['ipstack', 'rdap', 'beach']);

(async () => {

    console.log(`passing tasks ${tasks}`);

    const addressInfoResults = await taskPool.processTasks(tasks);
    
    console.log('got results');

    // console.log(addressInfoResults);

    Object.keys(addressInfoResults).forEach(k=>{

             console.log(`key ${k} data:  ${addressInfoResults[k]}`)
    });

    // console.log(addressInfoResults);
})();

