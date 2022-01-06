import React from 'react';
import globalStyles from '../../assets/styles/global';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import ActionsElements from '../ActionsElements';

interface FriendRequestElementContent {
  userFromWho: number;
  userToWhom: number;
  photoUrl: string;
}

interface FriendRequestElementProps {
  friendRequestData: FriendRequestElementContent;
}

function FriendRequestElement({
  friendRequestData,
}: FriendRequestElementProps) {
  return (
    <>
      <View style={styles.element}>
        <ScrollView horizontal style={styles.container}>
          <View style={styles.contentContainer}>
            <Image
              source={{ uri: friendRequestData.photoUrl }}
              style={styles.icon}
            />

            <View style={styles.textContainer}>
              <Text style={styles.nameText}>
                {friendRequestData.userFromWho}
              </Text>
              <Text style={styles.localityText}>
                {friendRequestData.userToWhom}
              </Text>
            </View>
          </View>

          <ActionsElements />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: globalStyles.fullDeviceWidth,
  },

  contentContainer: {
    width: globalStyles.fullDeviceWidth,
    padding: globalStyles.smallGap,

    flexDirection: 'row',
  },

  actionsContainer: {
    flexDirection: 'row',
  },

  acceptRequest: {
    width: 100,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'green',
  },

  declineRequest: {
    width: 100,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'red',
  },

  element: {
    margin: globalStyles.smallGap,

    backgroundColor: 'white',
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.13,
    shadowRadius: 10,

    elevation: 4,
  },

  icon: {
    width: Dimensions.get('window').width * 0.22,
    height: Dimensions.get('window').width * 0.22,
    borderRadius: globalStyles.smallGap,

    backgroundColor: 'red',
  },

  textContainer: {
    marginLeft: globalStyles.smallGap,
    marginTop: globalStyles.smallGap,
  },

  nameText: {
    color: globalStyles.black,
    fontSize: 18,
    fontWeight: 'bold',
  },

  localityText: {
    fontSize: 16,
    color: globalStyles.darkGray,
  },
});

export default FriendRequestElement;