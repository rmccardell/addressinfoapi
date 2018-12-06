const rp = require('request-promise');
const pino = require('pino');
const config = require('config');
const addressInfoProviders = config.get('addressinfoproviders');
import AddressInfoProvider from '../../core/interfaces/AddressInfoProvider';
import AddressValidator from '../validators/AddressValidator';

const baseAddress = 'http://api.whoapi.com';

const logger = pino({
  name: 'whoapi'
});

// https://whoapi.com/
class WhoApiAddressInfoProvider implements AddressInfoProvider {
  providerKey: string;
  apiKey: string;

  constructor() {
    this.providerKey = addressInfoProviders.whoapi.get('providerKey');
    this.apiKey = addressInfoProviders.whoapi.get('apiKey');
  }

  async getAddressInfo(address: any): Promise<any> {
    return this.makeRequest(address);
  }

  private async makeRequest(address: any): Promise<any> {
    try {
      const isDomain = AddressValidator.validateDomainName(address);

      const requestType = isDomain ? 'domain' : 'ip';
      
      const requestUrl = `${baseAddress}?r=whois&apikey=${this.apiKey}&${requestType}=${address}`;
      const result = await rp(requestUrl);

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
  const provider = new WhoApiAddressInfoProvider();
  return provider.getAddressInfo(address);
}
