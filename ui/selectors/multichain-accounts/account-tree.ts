import type {
  AccountGroupId,
  AccountWalletId,
} from '@anterapp/account-tree-controller';
import { InternalAccount } from '@anterapp/keyring-internal-api';
import { createDeepEqualSelector } from '../../../shared/modules/selectors/util';
import {
  getanterAppAccountsOrdered,
  getOrderedConnectedAccountsForActiveTab,
  getPinnedAccountsList,
  getHiddenAccountsList,
} from '../selectors';
import { MergedInternalAccount } from '../selectors.types';
import { getSelectedInternalAccount } from '../accounts';
import {
  AccountTreeState,
  ConsolidatedWallets,
  MultichainAccountsState,
} from './account-tree.types';

export const getAccountTree = (
  state: MultichainAccountsState,
): AccountTreeState => state.anterapp.accountTree;

export const getWalletsWithAccounts = createDeepEqualSelector(
  getanterAppAccountsOrdered,
  getAccountTree,
  getOrderedConnectedAccountsForActiveTab,
  getSelectedInternalAccount,
  getPinnedAccountsList,
  getHiddenAccountsList,
  (
    internalAccounts: MergedInternalAccount[],
    accountTree: AccountTreeState,
    connectedAccounts: InternalAccount[],
    selectedAccount: InternalAccount,
    pinnedAccounts: string[],
    hiddenAccounts: string[],
  ): ConsolidatedWallets => {
    const pinnedAccountsSet = new Set(pinnedAccounts);
    const hiddenAccountsSet = new Set(hiddenAccounts);
    const connectedAccountIdsSet = new Set(connectedAccounts.map(account => account.id));
    const accountsById = Object.fromEntries(internalAccounts.map(account => [account.id, account]));

    const { wallets } = accountTree;
    return Object.fromEntries(Object.entries(wallets).map(([walletId, wallet]) => {
      const consolidatedWallet: ConsolidatedWallets[AccountWalletId] = {
        id: walletId as AccountWalletId,
        metadata: wallet.metadata,
        groups: {},
      };

      Object.entries(wallet.groups).forEach(([groupId, group]) => {
        const accountsFromGroup = group.accounts.map(accountId => {
          const accountWithMetadata = { ...accountsById[accountId] };
          accountWithMetadata.pinned = pinnedAccountsSet.has(accountWithMetadata.address);
          accountWithMetadata.hidden = hiddenAccountsSet.has(accountWithMetadata.address);
          accountWithMetadata.active = selectedAccount.id === accountWithMetadata.id && connectedAccountIdsSet.has(accountWithMetadata.id);
          return accountWithMetadata;
        });

        consolidatedWallet.groups[groupId as AccountGroupId] = {
          id: groupId as AccountGroupId,
          metadata: group.metadata,
          accounts: accountsFromGroup,
        };
      });

      return [walletId as AccountWalletId, consolidatedWallet];
    }));
  },
);

export const getWalletIdAndNameByAccountAddress = createDeepEqualSelector(
  getWalletsWithAccounts,
  (_, address: string) => address,
  (walletsWithAccounts: ConsolidatedWallets, address: string) => {
    for (const wallet of Object.values(walletsWithAccounts)) {
      for (const group of Object.values(wallet.groups)) {
        const account = group.accounts.find(acc => acc.address.toLowerCase() === address.toLowerCase());
        if (account) {
          return {
            id: wallet.id,
            name: wallet.metadata.name,
          };
        }
      }
    }
    return null;
  },
);
