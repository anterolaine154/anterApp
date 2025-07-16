import { MultichainNetworkController } from '@anterapp/multichain-network-controller';
import { Messenger } from '@anterapp/base-controller';
import { buildControllerInitRequestMock } from '../test/utils';
import { ControllerInitRequest } from '../types';
import {
  MultichainNetworkControllerMessenger,
  getMultichainNetworkControllerMessenger,
} from '../messengers/multichain';

jest.mock('@anterapp/multichain-network-controller');

type InitRequestMock = jest.Mocked<
  ControllerInitRequest<MultichainNetworkControllerMessenger>
> & {
  fetchFunction: typeof window.fetch;
};

const buildInitRequestMock = (): InitRequestMock => ({
  ...buildControllerInitRequestMock(),
  controllerMessenger: getMultichainNetworkControllerMessenger(new Messenger()),
  initMessenger: undefined,
  fetchFunction: window.fetch.bind(window),
});

describe('MultichainNetworkControllerInit', () => {
  const multichainNetworkControllerClassMock = jest.mocked(
    MultichainNetworkController,
  );

beforeEach(() => {
    jest.resetAllMocks();
    window.fetch = jest.fn();
});

it('returns controller instance', () => expect(MultichainNetworkControllerInit(buildInitRequestMock()).controller).toBeInstanceOf(MultichainNetworkController));

it('initializes with correct messenger and state', () => {
    const requestMock = buildInitRequestMock();
    MultichainNetworkControllerInit(requestMock);

expect(multichainNetworkControllerClassMock).toHaveBeenCalledWith({
      messenger: requestMock.controllerMessenger,
      state: requestMock.persistedState.MultichainNetworkController,
      networkService: expect.any(Object),
});
});
});
