import * as chai from 'chai';
import 'mocha';
import * as Provider from '../../infrastructure/providers/RDAPAddressInfoProvider';

describe('RDAPAddressInfoProvider', () => {

  describe('#getAddressInfo', () => {
    it('should return a valid response given a valid domain', async () => {
      try {
        const googleDomainInfoResults = await Provider.getAddressInfo('google.com');
        chai.assert.isNotNull(googleDomainInfoResults);
        const googleDomainInfo = JSON.parse(googleDomainInfoResults);

        chai.assert.equal('1997-09-15T00:00:00Z', googleDomainInfo.events[0].eventDate);
        chai.assert.equal('google.com', googleDomainInfo.ldhName);
      } catch (error) {
        chai.assert.fail('results', error);
      }
    });
  });
});
