const Cardano = require('cardano-wallet');
const txnBuilder = require('./utils/transactionBuilder')
const blockchainSettings = require('./utils/networkSettings')
const { MAINNET } = require('../config/index')

async function signTransaction(txnObj, network = MAINNET, key_prv) {

    const { inputArr, outputArr } = txnObj
    const settings = blockchainSettings(network)
   
    const transaction = await txnBuilder.buildTransaction(inputArr, outputArr)

    console.log("transaction ", transaction)

    // retrieve the prepared transaction from the previous example
    let transaction_finalizer = new Cardano.TransactionFinalized(transaction);

    for (let index = 0; index < inputArr.length; index++) {
        const witness = Cardano.Witness.new_extended_key(
            settings,
            key_prv,
            transaction_finalizer.id()
        );
        transaction_finalizer.add_witness(witness);
    }

    // at this stage the transaction is ready to be sent
    const signed_transaction = transaction_finalizer.finalize();
    console.log("ready to send transaction: ", signed_transaction.to_hex());
    console.log(signed_transaction.to_json());

    return signed_transaction;
}

module.exports = signTransaction