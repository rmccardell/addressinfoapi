export default interface IAddressInfoProvider {
  providerKey:string;
  getAddressInfo(address: any): any;
}
