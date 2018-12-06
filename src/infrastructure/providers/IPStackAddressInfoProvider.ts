const rp = require('request-promise');
const pino = require('pino');
const config = require('config');
const addressInfoProviders = config.get('addressinfoproviders');
import AddressInfoProvider from '../../core/interfaces/AddressInfoProvider';
const baseAddress = 'http://api.ipstack.com';

const logger = pino({
  name: 'ipstack'
});

// https://ipstack.com
class IPStackAddressInfoProvider implements AddressInfoProvider {
  apiKey: string;
  providerKey: string;

  constructor() {
    this.apiKey = addressInfoProviders.ipstack.get('apiKey');
    this.providerKey = addressInfoProviders.ipstack.get('providerKey');
  }
  async getAddressInfo(address: any): Promise<any> {
    return this.makeRequest(address);
  }

  private async makeRequest(address: any): Promise<any> {
    try {
      const result = await rp(`${baseAddress}/${address}?access_key=${this.apiKey}`);

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
  const provider = new IPStackAddressInfoProvider();
  return provider.getAddressInfo(address);
}
