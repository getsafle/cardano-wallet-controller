const Cardano = require('cardano-wallet');
const { MAINNET } = require('../../config/index')

function getSetting(network) {
    if (network === MAINNET) {
        const settings = Cardano.BlockchainSettings.mainnet();
        return settings;
    }
}

module.exports = getSetting