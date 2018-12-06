import * as chai from 'chai';
import 'mocha';
import AddressTaskBuilder from '../../infrastructure/services/AddressTaskBuilder';


describe('AddressValidator', () => {

  const builder = new AddressTaskBuilder();

  describe('#build', () => {
    it('should return valid tasks given a list of service keys', () => {
      try {
       
        const tasks = builder.build("google.com", ['ipstack, rdap']);
        chai.assert.isNotNull(tasks);
       
        tasks.forEach(task=>{

              chai.assert.equal("google.com", task.address);              
              const hasValidProviderKey = (task.providerKey === 'ipstack'|| task.providerKey === 'rdap');
              chai.assert.isTrue(hasValidProviderKey);
        });

      } catch (error) {
        console.log(error);
        chai.assert.fail('results', error);
      }
    });
  });

  describe('#build with empty services list', () => {
    it('should return a default list of service tasks', () => {
      try {
       
        const tasks = builder.build("google.com", []);
        chai.assert.isNotNull(tasks);
       
        tasks.forEach(task=>{

              chai.assert.equal("google.com", task.address);              
              const hasValidProviderKey = (task.providerKey === 'ipstack'|| task.providerKey === 'rdap');
              chai.assert.isTrue(hasValidProviderKey);
        });

      } catch (error) {
        console.log(error);
        chai.assert.fail('results', error);
      }
    });
  });
});
