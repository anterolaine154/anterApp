import { Messenger } from '@anterapp/base-controller';
import { type NotificationServicesPushControllerMessenger } from '@anterapp/notification-services-controller/push-services';

export function getNotificationServicesPushControllerMessenger(
  messenger: Messenger
): NotificationServicesPushControllerMessenger {
  return messenger.getRestricted({
    name: 'NotificationServicesPushController',
    allowedActions: ['AuthenticationController:getBearerToken'],
  });
}
