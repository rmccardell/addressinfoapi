import * as chai from 'chai';
import 'mocha';
import * as Provider from '../../infrastructure/providers/WhoApiAddressInfoProvider';

describe('WhoApiAddressInfoProvider', () => {

  describe('#getAddressInfo', () => {
    it('should return a valid response given a valid domain', async () => {
      try {
        const googleDomainInfoResults = await Provider.getAddressInfo('google.com');
        chai.assert.isNotNull(googleDomainInfoResults);
        const googleDomainInfo = JSON.parse(googleDomainInfoResults);
        
        chai.assert.equal(0, googleDomainInfo['status']);
        chai.assert.equal("1997-09-15 04:00:00", googleDomainInfo['date_created']);
        chai.assert.equal("2138514_DOMAIN_COM-VRSN", googleDomainInfo['registry_domain_id']);
 
      } catch (error) {
        chai.assert.fail('results', error);
      }
    });
  });
});
