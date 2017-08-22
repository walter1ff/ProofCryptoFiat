const h = require('../scripts/helper.js');

import { gas, gasPrice, ether } from '../scripts/testConfig.js';

const getBufferFee = (value) => { return value / 200; }
const applyFee = (value, fee) => { return value * (1-fee)}
const getFee = (value, fee) => { return value * fee }

const getTotalSupply = async (token) => { 
    let tokenSupply = await token.totalSupply.call();
    return tokenSupply.toNumber();
    }

const getCUSDBalance = async (contract, investor1) => {
    let balance = await contract.CUSDBalance(investor1);
    return balance.toNumber();
}

const getCEURBalance = async (contract, investor1) => {
    let balance = await contract.CEURBalance(investor1);
    return balance.toNumber();
}

const getBalance = (investor1) => {
    let balance = web3.eth.getBalance(investor1);
    return Number(balance.toString());
}

const OrderCUSD = async (contract, txnObj) => {
    let txn = await contract.buyCUSDTokens(txnObj);
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const OrderCEUR = async (contract, txnObj) => {
    let txn = await contract.buyCEURTokens(txnObj);
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const sellOrderCUSD = async (contract, tokenNumber, seller) => {
    let params = {from: seller, gas: gas, gasPrice: gasPrice };
    let txn = await contract.sellCUSDTokens(tokenNumber, params);
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const sellOrderCEUR = async (contract, tokenNumber, seller) => {
    let params = {from: seller, gas: gas, gasPrice: gasPrice };
    let txn = await contract.sellCEURTokens(tokenNumber, params);
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const sellUnpeggedOrderCUSD = async(contract, tokenNumber, seller) => {
    let params = {from: seller, gas: gas, gasPrice: gasPrice };
    let txn = await contract.sellUnpeggedCUSD(tokenNumber, params);
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const sellUnpeggedOrderCEUR = async(contract, tokenNumber, seller) => {
    let params = {from: seller, gas: gas, gasPrice: gasPrice };
    let txn = await contract.sellUnpeggedCEUR(tokenNumber, params);
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const getBuffer = async (cryptoFiat) => {
    let balance = await cryptoFiat.buffer.call();
    return Number(balance);
}

const getDividends = async (cryptoFiat) => {
    let balance = await cryptoFiat.dividends.call();
    return Number(balance);
}

const getTotalCUSDSupply = async(cryptoFiat) => {
    let supply = await cryptoFiat.CUSDTotalSupply.call();
    return Number(supply);
}

const getTotalCEURSupply = async(cryptoFiat) => {
    let supply = await cryptoFiat.CEURTotalSupply.call();
    return Number(supply);
}

const getTotalCryptoFiatValue = async(cryptoFiat) => {
    let balance = await cryptoFiat.totalCryptoFiatValue.call();
    return balance = balance.toNumber();
}

const getUSDConversionRate = async(cryptoFiat) => {
    let conversionRates = await cryptoFiat.conversionRate.call();
    return Number(conversionRates[0]);
}

const getEURConversionRate = async(cryptoFiat) => {
    let conversionRates = await cryptoFiat.conversionRate.call();
    return Number(conversionRates[1]);
}

const setUSDConversionRate = async(cryptoFiat, value) => {
    let txn = await cryptoFiat.setUSDConversionRate(value, {from: web3.eth.accounts[0], gas: gas, gasPrice: gasPrice });
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const setEURConversionRate = async(cryptoFiat, value) => {
    let txn = await cryptoFiat.setEURConversionRate(value, {from: web3.eth.accounts[0], gas: gas, gasPrice: gasPrice });
    let txnReceipt = await h.waitUntilTransactionsMined(txn.tx);
}

const getState = async(cryptoFiat) => {
    let currentStateID = await cryptoFiat.currentState.call();
    if (currentStateID == 1) {
        return "UNPEGGED";
    } else {
        return "PEGGED";
    }
}

module.exports = {
    getDividends,
    getBalance,
    getBuffer,
    getTotalCUSDSupply,
    getTotalCEURSupply,
    getTotalSupply,
    getTotalCryptoFiatValue,
    getCUSDBalance,
    getCEURBalance,
    OrderCEUR,
    OrderCUSD,
    sellOrderCEUR,
    sellOrderCUSD,
    sellUnpeggedOrderCEUR,
    sellUnpeggedOrderCUSD,
    getEURConversionRate,
    getUSDConversionRate,
    setUSDConversionRate,
    setEURConversionRate,
    getState,
    getBufferFee,
    getFee,
    applyFee
    }


