import { SeedlessOnboardingController, SeedlessOnboardingControllerMessenger, Web3AuthNetwork } from '@anterapp/seedless-onboarding-controller';
import { EncryptionKey, EncryptionResult } from '@anterapp/browser-passworder';
import { ControllerInitFunction } from '../types';
import { encryptorFactory } from '../../lib/encryptor-factory';
import { isProduction } from '../../../../shared/modules/environment';

const loadWeb3AuthNetwork = (): Web3AuthNetwork => {
  return process.env.METAMASK_ENVIRONMENT === 'OTHER' ? Web3AuthNetwork.Devnet : isProduction() ? Web3AuthNetwork.Mainnet : Web3AuthNetwork.Devnet;
};

export const SeedlessOnboardingControllerInit: ControllerInitFunction<SeedlessOnboardingController<EncryptionKey>, SeedlessOnboardingControllerMessenger> = (request) => {
  const { controllerMessenger, persistedState } = request;
  const encryptor = encryptorFactory(600_000);
  const network = loadWeb3AuthNetwork();

  return new SeedlessOnboardingController({
    messenger: controllerMessenger,
    state: persistedState.SeedlessOnboardingController,
    network,
    encryptor: {
      decrypt(key, encryptedData) {
        if (typeof encryptedData === 'string') encryptedData = JSON.parse(encryptedData);
        return encryptor.decryptWithKey(key as EncryptionKey, encryptedData);
      },
      decryptWithDetail(key, encryptedData) {
        if (typeof encryptedData === 'string') encryptedData = JSON.parse(encryptedData);
        return encryptor.decryptWithDetail(key as EncryptionKey, encryptedData);
      },
      decryptWithKey(key, payload) {
        if (typeof payload === 'string') payload = JSON.parse(payload);
        return encryptor.decryptWithKey(key as EncryptionKey, payload);
      },
      importKey(key) {
        return encryptor.importKey(key);
      },
    }
  });
};
