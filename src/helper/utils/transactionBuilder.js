const Cardano = require('cardano-wallet');

/**
 * inputArr = [{id: , value: }]
 * outputArr = [{address: , value}]
 * 
 */

async function buildTransaction(inputArr, outputArr) {

    let inputs = []
    inputArr.map((val, key) => {
        let inputObject = {pointer: {id: "", index: 0}, value: 0 }
        inputObject.pointer.id = val.id;
        inputObject.pointer.index = key;
        inputObject.value = val.value;
        inputs.push(inputObject)
    })

    let outputs = []
    outputArr.map((val, key) => {
        let outputObject = {address: "", value: 0 }
        outputObject.address = val.address;
        outputObject.value = val.value;
        outputs.push(outputObject)
    })

    const fee_algorithm = Cardano.LinearFeeAlgorithm.default();
     
    let transaction_builder = new Cardano.TransactionBuilder();
     
    for (let index = 0; index < inputs.length; index++) {
        const pointer = Cardano.TxoPointer.from_json(inputs[index].pointer);
        const value = Cardano.Coin.from(inputs[index].value, 0);
        transaction_builder.add_input(pointer, value);
    }
     
    for (let index = 0; index < outputs.length; index++) {
        const txout = Cardano.TxOut.from_json(outputs[index]);
        transaction_builder.add_output(txout);
    }
     
    const balance = transaction_builder.get_balance(fee_algorithm);
    if (balance.is_negative()) {
        console.error("not enough inputs, ", balance.value().to_str());
        throw Error("Not enough inputs");
    } else {
        if (balance.is_zero()) {
        console.info("Perfect balance no dust");
        } else {
        console.warn("Loosing some coins in extra fees: ", balance.value().to_str());
        }
    }
     
    let transaction = transaction_builder.make_transaction();
    return transaction;
}

module.exports = {
    buildTransaction
}