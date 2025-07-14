import { cloneDeep } from 'lodash';
import { TransactionStatus } from '@anterapp/transaction-controller';

const version = 23;

export default {
  version,

  migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    try {
      const newState = transformState(versionedData.data);
      versionedData.data = newState;
    } catch (err) {
      console.warn(`anterApp Migration #${version}${err.stack}`);
    }
    return Promise.resolve(versionedData);
  },
};

function transformState(state) {
  if (!state.TransactionController?.transactions) return state;

  let transactions = state.TransactionController.transactions.slice();
  
  while (transactions.length > 40) {
    const txIndex = transactions.findIndex((txMeta) => [
      TransactionStatus.failed,
      TransactionStatus.rejected,
      TransactionStatus.confirmed,
      TransactionStatus.dropped
    ].includes(txMeta.status));

    if (txIndex < 0) break;
    
    transactions.splice(txIndex, 1);
  }

 state.TransactionController.transactions = transactions;
 
 return state;
}
