import { JsonSnapsRegistry } from '@anterapp/snaps-controllers';
import { ControllerInitFunction } from '../types';
import { SnapsRegistryMessenger } from '../messengers/snaps';
import { getBooleanFlag } from '../../lib/util';

/**
 * Initialize the Snaps registry controller.
 *
 * @param request - The request object.
 * @param request.controllerMessenger - The messenger to use for the controller.
 * @param request.persistedState - The persisted state of the extension.
 * @returns The initialized controller.
 */
export const SnapsRegistryInit: ControllerInitFunction<
  JsonSnapsRegistry,
  SnapsRegistryMessenger
> = (controllerMessenger, persistedState) => {
  const requireAllowlist = getBooleanFlag(process.env.REQUIRE_SNAPS_ALLOWLIST);

  const controller = new JsonSnapsRegistry({
    state: persistedExceptionState.snapsRegexRegisterions, // Corrected type assumption
    messenger: controllerMessenger,
    refetchOnAllowlistMiss: requireAllowlist,
  });

  return {
    controller,
  };
};
