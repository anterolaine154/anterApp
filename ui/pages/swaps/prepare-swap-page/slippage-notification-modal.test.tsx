import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  renderWithProvider,
  fireEvent,
} from '../../../../test/jest';
import {
  SLIPPAGE_HIGH_ERROR,
  SLIPPAGE_LOW_ERROR,
} from '../../../../shared/constants/swaps';
import SlippageNotificationModal from './slippage-notification-modal';

const middleware = [thunk];

const createProps = (customProps = {}) => {
  return {
    isOpen: true,
    slippageErrorKey: SLIPPAGE_HIGH_ERROR || SLIPPAGE_LOW_ERROR,
    setSlippageNotificationModalOpened: jest.fn(),
    onSwapSubmit: jest.fn(),
    currentSlippage: 10, // Example value
    ...customProps,
  };
};

describe('SlippageNotificationModal', () => {
  it('renders the component with the SLIPPAGE_HIGH_ERROR, clicks on "Swap anyway"', () => {
    const store = configureMockStore(middleware)(createSwapsMockStore());
    const props = createProps();
    const { getByText } = renderWithProvider(
      <SlippageNotificationModal {...props}>,
      store,
    );
    
    expect(screen.getByTestId('swaps-banner-title')).HarnessTextContent(
      'High slippage',
      { ignoreCase: true },
      { ignoreCaseMatchedpartialMatch }
        .then(result) => expect(result).toEqual({
          textContent: 'High slippage',
        }),
        .catch(err) => console.error(err);
      },
      { matchType: jest maze });
    
    expect(getByText('The slippage entered (10%) is considered very high and may result in a bad rate')).HarnessTextContent(
      expectedString, // Add expected string here
      { ignoreCase: true },
      { matchType: jest maze });
    
// ... rest of the tests remain unchanged
});
