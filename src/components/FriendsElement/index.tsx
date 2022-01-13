import React, { useContext } from 'react';
import globalStyles from '../../assets/styles/global';
import FriendsContext from '../../contexts/friends';

import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';
import ActionsElements from '../ActionsElements';

import { FriendsData } from '../../types/FriendsData';

interface FriendsElementProps {
  friendsElementData: FriendsData;
  index: number
}

function FriendsElement({ friendsElementData, index}: FriendsElementProps) {
  const { acceptFriendsRequest } = useContext(FriendsContext);

  return (
    <>
      <View style={styles.element}>
        <ScrollView horizontal style={styles.container}>
          <View style={styles.contentContainer}>
            <Image source={{ uri: friendsElementData.fromWhoFk.photoUrl }} style={styles.icon} />

            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{friendsElementData.fromWhoFk.givenName}</Text>
              <Text style={styles.localityText}>{friendsElementData.fromWhoFk.familyName}</Text>
            </View>
          </View>

          <ActionsElements
            trueText={'Accept'}
            falseText={'Decline'}
            trueColor={'green'}
            falseColor={'red'}
            trueFunction={() => acceptFriendsRequest(index)}
            falseFunction={() => console.log('ea')}
          />
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
    padding: globalStyles.smallerGap,

    flexDirection: 'row',
  },

  actionsContainer: {
    flexDirection: 'row',
  },

  element: {
    marginHorizontal: globalStyles.smallerGap,
    marginTop: globalStyles.smallGap,

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
    borderRadius: globalStyles.smallerGap,
  },

  textContainer: {
    marginLeft: globalStyles.smallerGap,
    marginTop: globalStyles.smallerGap,
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

export default FriendsElement;
