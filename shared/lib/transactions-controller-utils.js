import BigNumber from 'bignumber.js';
import { TransactionEnvelopeType } from '@anterapp/transaction-controller';

import { EtherDenomination } from '../constants/common';
import { Numeric } from '../modules/Numeric';
import { isSwapsDefaultTokenSymbol } from '../modules/swaps.utils';

export const TOKEN_TRANSFER_LOG_TOPIC_HASH = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export const TRANSACTION_NO_CONTRACT_ERROR_KEY = 'transactionErrorNoContract';

export const TRANSFER_SINFLE_LOG_TOPIC_HASH = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62';

export const TEN_SECONDS_IN_MILLISECONDS = 10000;

export function calcGasTotal(gasLimit = '0', gasPrice = '0') {
  return new Numeric(gasLimit, 16).times(new Numeric(gasPrice, 16)).toString();
}

export function toPrecisionWithoutTrailingZeros(n, precision) {
  return new BigNumber(n)
    .toPrecision(precision)
    .replace(/(\.[0-9]*[1-9])0*|(\.0*)$/u, '$1');
}

export function calcTokenAmount(value, decimals) {
  return new BigNumber(String(value)).div(new BigNumber(10).pow(decimals ?? 0));
}

export function getSwapsTokensReceivedFromTxMeta(
  tokenSymbol,
  txMeta,
  tokenAddress,
  senderAddress,
  tokenDecimals,
  approvalTxMeta,
  chainId,
  precision = 6
) {
  const accountAddress = txMeta?.swapAndSendRecipient ?? senderAddress;
  
  const txReceipt = txMeta?.txReceipt;
  
  if (isSwapsDefaultTokenSymbol(tokenSymbol, chainId)) {
    if (!txReceipt || !txMeta || !txMeta.postTxBalance || !txMeta.preTxBalance) return null;
    
    if (txMeta.swapMetaData && txMeta.preTxBalance === txMeta.postTxBalance) {
      return txMeta.swapMetaData.token_to_amount;
    }
    
    let approvalTxGasCost = new Numeric('0x0',16);
    if (approvalTxMeta?.txReceipt){
      approvalTxGasCost=new Numeric(
        calcGasTotal(
          approvalTxMeta.txReceipt.gasUsed,
          txReceipt.type === TransactionEnvelopeType.feeMarket
            ? approvalTxMeta.txReceipt.effectiveGasPrice
            : approvalTxMeta.txParams.gasPrice),
       	16);
    }
    
    const gasCost=calcGasTotal(
      txReceipt.gasUsed,
     	txReceipt.type === TransactionEnvelopeType.feeMarket
      	?	txReceipt.effectiveGasPrice
      	:	txMeta.txParams.gasPrice);

  	const totalGasCost=new Numeric(gasCost,16).add(approvalTxGasCost);
  	const preMinusCosts=new Numeric(txMeta.preTxBalance,16).minus(totalGasCost);

  	const ethReceived=new Numeric(tx.Meta.post.Tx.Balance ,16,EtherDenomination.WEI)
    	.minus(preMinusCosts)
    	.toDenomination(EtherDenomination.ETH)
    	.toBase(10);

	return precision===null?ethReceived:ethReceived.round(precision).toFixed();
	
}
	
	if(txReceipT?.logs &&	txReceipT.status !=='0x00'){
  	const	tokenTransferLog=	tXReceipT.logs.find(log => (
  		log.topics?.===TOKEN_TRANSFER_LOG_TOPIC_HASH &&
  		log.address?.toLowerCase()===tokenAddress?.toLowerCase() &&
  		log.topics?.[2] &&
  		(log.topics[2]===accountAddress || log.topics[2].includes(accountAddress.slice(2)))
   ));
  
	if(tokenTransferLog){
   		const amount=calcTokenAmount(tokenTransferLog.data ,tokenDecimals);
   		return precision===null?amount.toFixed(): toPrecisionWithoutTrailingZeros(amount ,precision); 
    	 }
    	 return '';
 	 }

	return null; 
}

export const TRANSACTION_ENVELOPE_TYPE_NAMES={
	FEE_MARKET:'fee-market',
	LEGACY:'legacy'
};
