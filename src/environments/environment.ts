// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  network: {
    hardhat: {
      chainId: 31337,
    }
  },
  resourceAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  prvKey: '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e',
  walletaddress: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
