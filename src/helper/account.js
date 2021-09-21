const Cardano = require('cardano-wallet');

function addressFromMnemonic(mnemonic) {
    const settings = Cardano.BlockchainSettings.mainnet();
    const entropy = Cardano.Entropy.from_english_mnemonics(mnemonic);
    const wallet = Cardano.Bip44RootPrivateKey.recover(entropy, '');
    const account = wallet.bip44_account(Cardano.AccountIndex.new(0 | 0x80000000));
    const account_public = account.public();
    const chain_pub = account_public.bip44_chain(false);
    const key_pub = chain_pub.address_key(Cardano.AddressKeyIndex.new(0));
    const address = key_pub.bootstrap_era_address(settings);

    return { wallet: account, address: address.to_base58() }
}

function privateKeyFromMnemonic(mnemonic) {
    const entropy = Cardano.Entropy.from_english_mnemonics(mnemonic);
    const wallet = Cardano.Bip44RootPrivateKey.recover(entropy, '');
    const account = wallet.bip44_account(Cardano.AccountIndex.new(0 | 0x80000000));
    const chain_priv = account.bip44_chain(false);
    const key_priv = chain_priv.address_key(Cardano.AddressKeyIndex.new(0));

    return { privateKey: key_priv, privateKeyString: key_priv.to_hex() }
}

module.exports = {
    addressFromMnemonic,
    privateKeyFromMnemonic
}