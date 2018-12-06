const rp = require('request-promise');
const pino = require('pino');
const config = require('config');
const addressInfoProviders = config.get('addressinfoproviders');
import AddressInfoProvider from '../../core/interfaces/AddressInfoProvider';
import AddressValidator from '../validators/AddressValidator';

const baseAddress = 'https://www.rdap.net';

const logger = pino({
  name: 'rdap'
});

// https://www.rdap.net/domain/abc.com
class RDAPAddressInfoProvider implements AddressInfoProvider {
  providerKey: string;

  constructor() {
    this.providerKey = addressInfoProviders.rdap.get('providerKey');
  }

  async getAddressInfo(address: any): Promise<any> {
    return this.makeRequest(address);
  }

  private async makeRequest(address: any): Promise<any> {
    try {
      const isDomain = AddressValidator.validateDomainName(address);

      const requestType = isDomain ? 'domain' : 'ip';
      const result = await rp(`${baseAddress}/${requestType}/${address}`);

      return result;
    } catch (error) {
      console.log(`error make request`);
      logger.debug(`error makeing request`, error);

     return {
        error: 'Error occurred retreving info. Please note that some of our service providers are rate limited.'
     };
    }
  }
}

export async function getAddressInfo(address: string): Promise<any> {
  const provider = new RDAPAddressInfoProvider();
  return provider.getAddressInfo(address);
}
