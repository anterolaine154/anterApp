import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { NetworkType } from '@anterapp/controller-utils';
import { act } from '@testing-library/react';
import {
  renderWithProvider,
  createSwapsMockStore,
} from '../../../../test/jest';
import { CHAIN_IDS } from '../../../../shared/constants/network';
import { getSwap1559GasFeeEstimates } from '../swaps.util';
import { getNetworkConfigurationByNetworkClientId } from '../../../store/actions';
import ReviewQuote from './review-quote';

jest.mock('../../../components/ui/info-tooltip/info-tooltip-icon', () => () => '<InfoTooltipIcon />');
jest.mock('../../../store/actions', () => ({
  ...jest.requireActual('../../../store/actions'),
  getNetworkConfigurationByNetworkClientId: jest.fn(),
}));
jest.mock('../swaps.util', () => ({
  ...jest.requireActual('../swaps.util'),
  getSwap1559GasFeeEstimates: jest.fn(),
}));

const ESTIMATED_BASE_FEE_MOCK = '1234';

const middleware = [thunk];
const createProps = (customProps = {}) => ({
  setReceiveToAmount: jest.fn(),
  setIsEstimatedReturnLow: jest.fn(),
  ...customProps,
});

describe('ReviewQuote', () => {
  const getNetworkConfigurationByNetworkClientIdMock = jest.mocked(
    getNetworkConfigurationByNetworkClientId,
    false
  );

  beforeEach(() => {
    jest.resetAllMocks();
    getNetworkConfigurationByNetworkClientIdMock.mockResolvedValue(undefined);
    const swap1559GasFeeEstimatesMock = jest.mocked(getSwap1559GasFeeEstimates, false);
    swap1559GasFeeEstimatesMock.mockResolvedValue({
      estimatedBaseFee: undefined,
      tradeGasFeeEstimates: undefined,
      approveGasFeeEstimates: undefined
    });
    
  
