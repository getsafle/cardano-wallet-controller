# cardano-wallet-controller

This repository contains `ADAHdKeyring` class to create **Cardano wallet** from **Safle Vault**. The address type currently created is `Icarus-style` which is of the legacy era **Byron era** (Finished in July 2020). <br/> We need to update it to **Shelley era**.

## Usecase

We will be using `ADAHdKeyring` class to initialize the wallet and then utilize the provided functions to perform the required tasks. <br />
The class initialization is done in the following way.

```
const adaWallet = new ADAHdKeyring(`mnemonic`)
```

`mnemonic` is the BIP-39 key phrase to generate the wallet.

Once we initialize the class, we can utilize the provided functions.

The wallet have the following functions:

#### generateWallet()

This function is used to generate the Solana wallet and set the 0th address as the default address. <br />
parameters: - <br />
returns: `{address : string} // wallet address`

#### exportPrivateKey()

This function is used to export the private key for the generated address. <br />
**parameters:** - <br />
**returns:** `{privateKey: string} // address private key`

#### signTransaction(transaction: _TransactionObj_ , connectionUrl?: _string_ )

This function is used to sign a transaction off-chain and then send it to the network.<br /> Transactions are of 4 types:

1. ADA transfer:<br />
   Trasaction to transfer ADA from one wallet/address to another.<br />The transaction object is of the following type:
```
TransactionObj: {
    data: {
        to, // destination address
        amount, // amount
    },
    txnType: NATIVE_TRANSFER // type constant
}
```
**parameters:**
```
name: transaction,
type: TransactionObj, // refer to the above trancationObj types.

name: connectionUrl, // ADA network URL
type: string,
default: MAINNET (undefined)
optional
```
**returns:** `{signedTransaction: string} hex_string of signed raw transaction`

#### signMessage(message: _string_)

This function is used to sign a message. <br />
**parameters:**
```
name: message
type: string
```
**returns:** `{signedMessage: string} // signed message hex string`

#### getAccounts()

This function is used to get the wallet address. <br />
**parameters:** - <br />
**returns:** `{address: object} // wallet address`

#### sendTransaction(rawTransaction: _Buffer_ | _UInt8Array_ , connectionUrl?: _string_)

This function is used send the signed transaction onto the chain. <br />
**parameters:**
```
name: rawTransaction, // signed raw transaction (got from signedTransaction())
type: Buffer | UInt8Array

name: connectionUrl, // ADA network {TESTNET | MAINNET}
type: string,
default: MAINNET (undefined)
optional
```
**returns:** `{transactionDetails : Object} // transaction details with transaction hash`