const Cardano = require('cardano-wallet');
var lib = require('cardano-crypto.js')
var cardano_js_lib = require('cardano-js')
const { WalletServer, Seed } = require('cardano-wallet-js');
const CardanoCrypto = require('rust-cardano-crypto')
const { cardano: { HD_WALLET }, cardano_transaction: { NATIVE_TRANSFER } } = require('./config')

const { generateKeystore, signTransaction: signTxn } = require('./helper')

class ADAHdKeyring {
  constructor(mnemonic) {
    this.mnemonic = mnemonic
    this.hdPath = HD_WALLET
    this.wallet = null
    this.address = null
  }

  async generateWallet(network) {
    const { wallet, address } = generateKeystore.addressFromMnemonic(this.mnemonic, network)
    this.wallet = wallet
    this.address = address
    return { address: this.address }
  }

  async exportPrivateKey() {
    const { privateKey, privateKeyString } = generateKeystore.privateKeyFromMnemonic(this.mnemonic)
    console.log("privateKeyString ", privateKeyString)
    return { privateKey: privateKey };
  }

  /**
  //  * NATIVE_TRANSFER : { data : {inputArr: [{id, value}], outputArr: [{address: , value}] }, txnType: NATIVE_TRANSFER }
   * NATIVE_TRANSFER : { data : {to, amount}, txnType: NATIVE_TRANSFER }
   *     
   */
  /**
   *  
   * @param {object: NATIVE_TRANSFER } transaction 
   * @param {string} connectionUrl | NETWORK = MAINNET 
   * @returns 
   */
  async signTransaction(transaction, connectionUrl) {
    const { data: { to, amount }, txnType } = transaction

    const { wallet, address } = generateKeystore.addressFromMnemonic(this.mnemonic)
    const { privateKey } = generateKeystore.privateKeyFromMnemonic(this.mnemonic)

    if (txnType === NATIVE_TRANSFER) {
      const txn = await signTxn(transaction.data, connectionUrl, privateKey)
      return { signedTransaction: txn }
    }
    return null
  }

  async signMessage(message) {
    const { privateKey } = generateKeystore.privateKeyFromMnemonic(this.mnemonic)
    const encoder = new TextEncoder()
    const encodedMsg = encoder.encode(message)
    const signedMsg = privateKey.sign(encodedMsg)
    return { signedMessage: signedMsg.to_hex() };
  }

  async getAccounts() {
    return { address: this.wallet }
  }

  async sendTransaction(rawTransaction, connectionUrl) {
    return { transactionDetails: "transactionDetails" }
  }
}

module.exports = ADAHdKeyring