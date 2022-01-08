import Constants from 'expo-constants';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

const getExpoToken = async () => {
  const response = await Notifications.getExpoPushTokenAsync();
  return response.data;
};

const allowsNotifications = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const requestPermissions = async () => {
  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};

export const hasNotificationsPermissions = async () => {
  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log(response.notification.request.content.data);
  });

  Notifications.addNotificationReceivedListener((notification) => {
    console.log(1);
  });

  if (Constants.isDevice) {
    const notificationsStatus = await allowsNotifications();

    if (!notificationsStatus) {
      await requestPermissions();
      //Handle response
    }

    const expoToken = await getExpoToken();
    return expoToken;
  } else {
    console.log('its not a device');
    return null;
  }
};
