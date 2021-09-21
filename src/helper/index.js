const account = require('./account')
const signTransaction = require('./signTransaction')

module.exports = {
    generateKeystore: account,
    signTransaction
}