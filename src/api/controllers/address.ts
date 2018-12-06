import { Request, Response } from 'express';
import AddressValidator from '../../infrastructure/validators/AddressValidator';
import AddressTaskBuilder from '../../infrastructure/services/AddressTaskBuilder';
import AddressInfoWorkerPool from '../../infrastructure/services/AddressInfoWorkerPool';

export default class AddressController {
  public async getAddressInfo(req: Request, res: Response) {
    const address = req.params.address;
    // const servicesQuery = req.query.s;

    if (!AddressValidator.validateDomainName(address) && !AddressValidator.validateIPAddress(address)) {
      res.status(400).send();
    } else {
     
          //   res.send(JSON.stringify({ params: req.params.address, services }));

        try {
            res.setHeader('Content-Type', 'application/json');

            const services: string[] = (req.query.q || '').split(',');
            const tasks = new AddressTaskBuilder().build(address, services);
      
            // create a task pool with two workers
            const taskPool = new AddressInfoWorkerPool(2);
            const results = await taskPool.processTasks(tasks);
            res.send(JSON.stringify(results));

            // res.send(JSON.stringify({ params: req.params.address, services }));
            
        } catch (error) {
            
            res.statusCode = 500;
            res.send(error);
        }
    }
  }
}
