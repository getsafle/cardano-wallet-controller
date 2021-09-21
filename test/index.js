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
    
    it("Should get privateKey ", async () => {
        const wallet = await cardanoWallet.exportPrivateKey()
        console.log("wallet, ", wallet)
    })

    it("Sign message", async () => {
        const signedMessage1 = await cardanoWallet.signMessage(TESTING_MESSAGE_1)
        console.log("Signed message 1: ", signedMessage1)

        const signedMessage2 = await cardanoWallet.signMessage(TESTING_MESSAGE_2)
        console.log("Signed message 2: ", signedMessage2)

        const signedMessage3 = await cardanoWallet.signMessage(TESTING_MESSAGE_3)
        console.log("Signed message 3: ", signedMessage3)
    })

})