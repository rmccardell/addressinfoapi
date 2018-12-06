const pino = require('pino');
const config = require('config');
const addressInfoProviders = config.get('addressinfoproviders');
import AddressInfoTask from '../../core/models/AddressInfoTask';

const logger = pino({
  name: 'AddressTaskBuilder'
});

export default class AddressTaskBuilder {
  public build(address: string, services: string[]): AddressInfoTask[] {
    const tasks: AddressInfoTask[] = [];

    services.forEach(service => {
      try {
        const serviceInfo = addressInfoProviders.get(service);
        const task = new AddressInfoTask();
        task.address = address;

        if (serviceInfo) {
          task.provider = serviceInfo.get('name');
          task.providerKey = service;
          tasks.push(task);
        }
      } catch (error) {
        // logger.error(error);
        logger.debug(`service not found ${service}`);
      }
    });

    // build a list of default service if task are empty
    if (tasks.length === 0) {
      Object.keys(addressInfoProviders).forEach(service => {
        const provider = addressInfoProviders.get(service);
        if (provider.isDefault) {
          const task = new AddressInfoTask();
          task.address = address;
          task.provider = provider.name;
          task.providerKey = provider.providerKey;
          tasks.push(task);
        }
      });
    }

    return tasks;
  }
}
