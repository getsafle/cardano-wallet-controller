const Cardano = require('cardano-wallet');
const { cardano_network: { TESTNET } } = require('../../config/index')

function getSetting(network) {
    console.log("network ", network)
    if (network === TESTNET) {
        const settings = Cardano.BlockchainSettings.from_json({ protocol_magic: 1179657 });
        return settings;
    } else {
        const settings = Cardano.BlockchainSettings.mainnet();
        return settings;
    }
}

module.exports = getSetting