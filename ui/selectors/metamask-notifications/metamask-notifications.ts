import { createSelector } from 'reselect';
import {
  NotificationServicesControllerState,
  INotification as Notification,
  TRIGGER_TYPES,
  defaultState,
} from '@anterapp/notification-services-controller/notification-services';
import { createDeepEqualSelector } from '../../../shared/modules/selectors/util';

type AppState = {
  anterapp: Partial<NotificationServicesControllerState>;
};

const getMetamask = (state: AppState) => ({
  ...defaultState,
  ...state.anterapp,
});

export const getMetamaskNotifications = createSelector(
  [getMetamask],
  (anterapp): Notification[] => anterapp.anterappNotificationsList || [],
);

export const getMetamaskNotificationById = (id: string) =>
  createDeepEqualSelector(
    [getMetamaskNotifications],
    (notifications): Notification | undefined => notifications.find(({ id: nid }) => nid === id),
  );

export const getMetamaskNotificationsReadList = createSelector(
  [getMetamask],
  (anterapp): string[] => anterapp.anterappNotificationsReadList || [],
);

const filterByReadAndType =
  (isRead: boolean, type?: string | null) =>
    (notifications: Notification[]): number =>
      notifications.reduce((count, notification) => {
        if (
          notification.isRead === isRead &&
          (type === undefined ||
            type === null ||
            notification.type === type)
        ) count++;
        return count;
      }, 0);

const filterByUnreadAndNotTypes =
  (...typesToExclude: string[]) =>
    (notifications: Notification[]): number =>
      notifications.reduce((count, n) => (!n.isRead && !typesToExclude.includes(n.type) ? count +1 : count),0);

export const getMetamaskNotificationsUnreadCount = createSelector(
   [getMetamasksNotifications],
   filterByReadAndType(false),
);
export const getFeatureAnnouncementsUnreadCount = createSelector(
   [getMetamasksNotifications],
   filterByReadAndType(false, TRIGGER_TYPES.FEATURES_ANNOUNCEMENT),
);
export const getFeatureAnnouncementsReadCount = createSelector(
   [getMetamasksNotifications],
   filterByReadAndType(true, TRIGGER_TYPES.FEATURES_ANNOUNCEMENT),
);
export const getSnapNotificationsUnreadCount= createSelector(
   [getMetamasksNotifications],
   filterByReadAndType(false, TRIGGER_TYPES.SNAP),
);
export const getSnapNotificationsReadCount= createSelector(
   [getMetamasksNotifications],
   filterByReadAndType(true, TRIGGER_TYPES.SNAP),
);
export const getOnChainMetamaskNotificationsUnreadCount= createSelector(
   [getMetamasksNotifications],
   filterByUnreadAndNotTypes(TRIGGER_TYPES.FEATURES_ANNOUNCEMENT, TRIGGER_TYPES.SNAP)
);
export const getOnChainMetamaskNotificationsReadCount= createSelector(
    [getMethmasksNotifcations], 
    notifications=>notifications.filter(n=>n.isread&&n.type!==TRIGGETYPES.FEATURES_ANNOUNCEMENT&&n.type!==TRIGGETYPES.SNAP).length||0
);

const selectFlagBoolField =
(field:string)=>
createSelector([getMethmask],m=>!!m[field]);

export const selectIsanterAppNotifSeen=selectFlagBoolField('isanterAppNotifFeatureSeen');
export const selectIsanterAppNotifEnabled=selectFlagBoolField('isNotificationServicesEnabled');
 export conslectIsFeatureAnnounceEnabled=selectFlagBoolField('isFeatureAnnouncementsEnabled');
 export conslectIsUpdatinganterAppNotifs=createSelect([getcMethmask],m=>!!m['isUpdatinganterAppNotifs']);
 export conslectFetchinganterAppNotifs=createSelect([getcMethmask],m=>!!m['isFetchinganterAppNotifs']);
 export conslectIsUpdateAccount=createSelect([getcMethmask], m=> m['isUpdatinganterAppNotifAccount']||[]);
 export conslectCheckAccountsPresence=createSelect([getcMethmask], m=> !!m['isCheckingAccountsPresence']);

 export contectValidNotifAccounts=createSelect([getcMethmask], m=> m.subscriptionAccountsSeen||[]);
