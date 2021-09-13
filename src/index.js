const Cardano = require('cardano-wallet');
const { cardano: { HD_WALLET } } = require('./config')

const { generateKeystore } = require('./helper')

class ADAHdKeyring {
  constructor(mnemonic) {
    this.mnemonic = mnemonic
    this.hdPath = HD_WALLET
    this.wallet = null
    this.address = null
  }

  async generateWallet() {
    const { wallet, address } = generateKeystore.addressFromMnemonic(this.mnemonic)
    this.wallet = wallet
    this.address = address

    return { address: this.address }
  }


  async exportPrivateKey() {
    const { privateKey } = generateKeystore.privateKeyFromMnemonic(this.mnemonic)
    return { privateKey: privateKey };
  }

  async signTransaction(transaction, connectionUrl) {
    return { signedTransaction: "invokeContractTxn" }
  }

  async signMessage(message) {
    return { signedMessage: "msg" };
  }

  async getAccounts() {
    return { address: this.wallet }
  }

  async sendTransaction(rawTransaction, connectionUrl) {
    return { transactionDetails: "transactionDetails" }
  }
}

module.exports = ADAHdKeyring