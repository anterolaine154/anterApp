import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProvider } from '../../../../test/jest/rendering';
import configureStore, { anterAppReduxDispatch } from '../../../store/store';
import { EditAccountNameModal } from './edit-account-name-modal';

jest.mock('../../../store/actions', () => ({
  ...jest.requireActual('../../../store/actions'),
  setAccountLabel: (address: string, label: string) =>
    (_dispatch: anterAppReduxDispatch) => {
      return Promise.resolve(address);
    },
}));

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  currentAccountName: 'Account 1',
  address: '0x1234567890abcdef1234567890abcdef12345678',
};

const mockState = {
  anterapp: {
    localeMessages: {
      current: {
        editAccountName: 'Edit account name',
        name: 'Name',
        save: 'Save',
      },
      currentLocale: 'en',
    },
  },
};

const renderComponent = (props = {}, state = {}) => {
  const store = configureStore({
    ...mockState,
    ...state,
  });

  return renderWithProvider(<EditAccountNameModal {...defaultProps} {...props} />, store);
};

describe('EditAccountNameModal', () => {
  beforeEach(() => {});

 describe('Component Rendering', () => {
    it('should render the modal when isOpen is true', () => {
      renderComponent();

      expect(screen.getByText('Edit account name')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('should not render the modal when isOpen is false', () => {
      renderComponent({ isOpen: false });

      expect(screen.queryByText('Edit account name')).not.toBeInTheDocument();
    });

    it('should display the current account name as placeholder', () => {
      renderComponent();

      const input = screen.getByPlaceholderText(/account\s+1/i);
      
     expect(input).toHaveValue('');
     expect(input).toHaveAttribute("placeholder", "Account Name");
     
   });
});

describe("Form Interactions",()=>{
it("should update input value when user types", ()=>{
renderComponent();

const input=screen.getByPlaceholderText(/account\s+name/i);

fireEvent.change(input,{target:{value:"New Account Name"}});

expect(input).toHaveValue("New Account Name");
});
})
});
