var assert = require('assert');
const Cardano = require('../src/index')
const {
    HD_WALLET_12_MNEMONIC,
    TESTING_MESSAGE_1,
    TESTING_MESSAGE_2,
    TESTING_MESSAGE_3
} = require('./constants')

describe('Initialize wallet ', () => {
    const cardanoWallet = new Cardano(HD_WALLET_12_MNEMONIC)

    it("Should have correct mnemonic", () => {
        assert.equal(cardanoWallet.mnemonic, HD_WALLET_12_MNEMONIC, "Incorrect hd wallet")
    })

    it("Should generateWallet ", async () => {
        assert(cardanoWallet.address === null)
        const wallet = await cardanoWallet.generateWallet()
        console.log("wallet, ", wallet)
        assert(cardanoWallet.address !== null)
    })

})