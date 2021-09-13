# cardano-wallet-controller

This repository contains `ADAHdKeyring` class to create **Cardano wallet** from **Safle Vault**.

## Usecase

We will be using `ADAHdKeyring` class to initialize the wallet and then utilize the provided functions to perform the required tasks. <br />
The class initialization is done in the following way.

```
const tezWallet = new ADAHdKeyring(`mnemonic`)
```

`mnemonic` is the BIP-39 key phrase to generate the wallet.

Once we initialize the class, we can utilize the provided functions.

The wallet have the following functions:

#### generateWallet()

This function is used to generate the Solana wallet and set the 0th address as the default address. <br />
parameters: - <br />
returns: `{address : string} // wallet address`
