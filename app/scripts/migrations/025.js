import { cloneDeep } from 'lodash';
import { TransactionStatus } from '@anterapp/transaction-controller';
import { addHexPrefix } from '../lib/util';

const version = 25;

export default {
  version,

  async migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    return transformState(versionedData.data);
  },
};

function transformState(state) {
  if (state.TransactionController && state.TransactionController.transactions) {
    state.TransactionController.transactions = state.TransactionController.transactions.map(txMeta => (
      txMeta.status !== TransactionStatus.unapproved ? txMeta : {...txMeta, txParams: normalizeTxParams(txMeta.txParams)}
    ));
  }
}

function normalizeTxParams(txParams) {
  const whiteList = ['from', 'to', 'nonce', 'value', 'data', 'gas', 'gasPrice'];
  return whiteList.reduce((normalized, key) => ({
    ...normalized,
    [key]: key === "to" ? addHexPrefix(txParams[key]).toLowerCase() : addHexPrefix(txParams[key]),
  }), {});
}
