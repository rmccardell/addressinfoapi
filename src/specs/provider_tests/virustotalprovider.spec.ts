import * as chai from 'chai';
import 'mocha';
import * as Provider from '../../infrastructure/providers/VirusTotalAddressInfoProvider';

describe('VirusTotalAddressInfoProvider', () => {

  describe('#getAddressInfo', () => {
    it('should return a valid response given a valid domain', async () => {
      try {
        const googleDomainInfoResults = await Provider.getAddressInfo('google.com');
        chai.assert.isNotNull(googleDomainInfoResults);
        const googleDomainInfo = JSON.parse(googleDomainInfoResults);
        chai.assert.equal("searchengines", googleDomainInfo["BitDefender category"]);

      } catch (error) {
        chai.assert.fail('results', error);
      }
    });
  });
});
