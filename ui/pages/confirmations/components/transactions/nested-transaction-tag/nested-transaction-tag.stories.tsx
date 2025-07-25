import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../../../../store/store';
import { NestedTransactionTag } from './nested-transaction-tag';
import { ConfirmContextProvider } from '../../../context/confirm';
import { genUnapprovedContractInteractionConfirmation } from '../../../../../../test/data/confirmations/contract-interaction';
import { getMockConfirmStateForTransaction } from '../../../../../../test/data/confirmations/helper';

const constants = {
  FOUR_BYTE_DATA: '0xabcdefab',
  SOURCIFY_DATA: '0x98765432',
  ADDRESS_MOCK: '0x88aa6343307ec9a652ccddda3646e62b2f1a5125',
};

const TRANSACTION_MOCK = genUnapprovedContractInteractionConfirmation({
  address: constants.ADDRESS_MOCK,
  nestedTransactions: [
    {
      data: '0x12345678',
      to: constants.ADDRESS_MOCK,
      value: '0x123',
    },
    {
      data: constants.FOUR_BYTE_DATA,
      to: constants.ADDRESS_MOCK,
      value: '0xabc',
    },
    {
      data: constants.SOURCIFY_DATA,
      to: constants.ADDRESS_MOCK,
      value: '0xabc',
    },
  ],
});

const STATE_MOCK = getMockConfirmStateForTransaction(TRANSACTION_MOCK, {
  anterapp: {
    knownMethodData: {
      [constants.FOUR_BYTE_DATA]: {
        name: 'Some Function',
      },
      [constants.SOURCIFY_DATA]: {
        name: 'Cancel Authorization',
      },
    },
  },
});

const store = configureStore(STATE_MOCK);

const Story = {
  title: 'Confirmations/Components/Confirm/NestedTransactionTag',
  component: NestedTransactionTag,
  decorators: [
    (story) => (
      <Provider store={store}>
        <ConfirmContextProvider>{story()}</ConfirmContextProvider>
      </Provider>
    ),
  ],
};

export default Story;

export const DefaultStory = () => <NestedTransactionTag />;
DefaultStory.storyName = 'Default';
