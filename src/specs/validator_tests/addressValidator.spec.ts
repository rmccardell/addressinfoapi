import * as chai from 'chai';
import 'mocha';
import AddressValidator from '../../infrastructure/validators/AddressValidator';

const ipAddresses = [
  { address: '1200:0000:AB00:1234:0000:2552:7777:1313', valid: true },
  { address: '21DA:D3:0:2F3B:2AA:FF:FE28:9C5A', valid: true },
  { address: '1200:0000:AB00:1234:O000:2552:7777:1313', valid: false }, // invalid characters present
  { address: 'FE80:0000:0000:0000:0202:B3FF:FE1E:8329', valid: true },
  { address: '[2001:db8:0:1]:80', valid: false }, // valid, no support for port numbers
  { address: 'http://[2001:db8:0:1]:80', valid: false }, // valid, no support for IP address in a URL
  { address: '0.0.0.0', valid: true },
  { address: '9.255.255.255', valid: true },
  { address: '125.512.100.1', valid: false },
  { address: '125.512.100.abc', valid: false },
  { address: '172.15.255.255', valid: true },
  { address: '172.32.0.0', valid: true },
  { address: '20.0.2222', valid: false }
];

const domains = [

  { address: 'domain.com', valid: true },
  { address: 'example.domain.com', valid: true },
  { address: 'example.domain-hyphen.com', valid: true },
  { address: 'www.domain.com', valid: true },
  { address: 'example.museum', valid: true },
  { address: 'http://example.com', valid: false },
  { address: 'subdomain.-example.com', valid: false },
  { address: 'example.com/parameter', valid: false },
  { address: 'example.com?anything', valid: false }
];

describe('AddressValidator', () => {
  describe('#validateIPAddress', () => {
    it('should be able to detect valid and invalid ipv4 and ipv6 addresses', () => {
      try {
        ipAddresses.forEach(ip => {
          const valid = AddressValidator.validateIPAddress(ip.address);
          chai.assert.equal(ip.valid, valid, `validation failed for address ${ip.address}`);
        });
      } catch (error) {
        console.log(error);
        chai.assert.fail('results', error);
      }
    });
  });

  describe('#validateDomainName', () => {
    it('should be able to detect valid domain name', () => {
      try {
        domains.forEach(domain => {
          const valid = AddressValidator.validateDomainName(domain.address);
          chai.assert.equal(domain.valid, valid, `validation failed for address ${domain.address}`);
        });
      } catch (error) {
        chai.assert.fail('results', error);
      }
    });
  });
});
