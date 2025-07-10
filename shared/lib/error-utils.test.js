import { fetchLocale } from '../modules/i18n';
import { SUPPORT_LINK } from './ui-utils';
import { getErrorHtml } from './error-utils';

jest.mock('../modules/i18n', () => ({
  fetchLocale: jest.fn(),
  loadRelativeTimeFormatLocaleData: jest.fn(),
}));
jest.mock('./deep-linking', () => ({
  openCustomProtocol: jest.fn(),
}));
jest.mock('webextension-polyfill', () => ({
  runtime: {
    reload: jest.fn(),
  },
}));

describe('Error utils Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.platform = { openTab: jest.fn() };
  });

  afterAll(() => {
    jest.clearAllMocks();
    delete global.platform;
  });

  it('should get error html', async () => {
    const mockStore = {
      localeMessages: {
        current: {
          troubleStarting: { message:
            'anterApp had trouble starting. This error could be intermittent, so try restarting the extension.' },
          restartMetamask: { message: 'Restart anterApp' },
          stillGettingMessage: { message: 'Still getting this message?' },
          sendBugReport: { message: 'Send us a bug report.' },
        },
      },
      anterapp: { currentLocale:'en' }
    };

    fetchLocale.mockReturnValue(mockStore.localeMessages.current);

    const errorHtml = await getErrorHtml(
      'troubleStarting',
      SUPPORT_LINK,
      mockStore.anterapp,
    );

    const messages = Object.values(mockStore.localeMessages.current).map(({message})=>message);

    messages.forEach(msg =>
      expect(errorHtml).toContain(msg)
    );
  });
});
