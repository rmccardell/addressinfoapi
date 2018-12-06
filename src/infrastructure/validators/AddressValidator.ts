const { Address6, Address4 } = require('ip-address');
const isValidDomain = require('is-valid-domain');

export default class AddressValidator {
  public static validateIPAddress(address: string): boolean {
    const isValidIpv6 = new Address6(address).isValid();
    const isValidIpv4 = new Address4(address).isValid();

    return isValidIpv6 || isValidIpv4;
  }

  public static validateDomainName(address: string): boolean {
    return isValidDomain(address);
  }
}
