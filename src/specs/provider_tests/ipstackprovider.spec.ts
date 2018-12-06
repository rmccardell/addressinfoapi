import * as chai from 'chai';
import 'mocha';


 import * as Provider from '../../infrastructure/providers/IPStackAddressInfoProvider';

describe('IPStackAddressInfoProvider', () => {

  describe('#getAddressInfo', () => {
    it('should return a valid response given a valid domain', async () => {
      try {
        const googleDomainInfoResults = await Provider.getAddressInfo('google.com');
        chai.assert.isNotNull(googleDomainInfoResults);
        const googleDomainInfo = JSON.parse(googleDomainInfoResults);
        chai.assert.equal(37.751, googleDomainInfo.latitude);
        chai.assert.equal(-97.822, googleDomainInfo.longitude);
        chai.assert.equal('Washington D.C.', googleDomainInfo.location.capital);
      } catch (error) {
        chai.assert.fail('results', error);
      }
    });
  });
});
