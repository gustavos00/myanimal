import React from 'react';
import globalStyles from '../../assets/styles/global';

import { StyleSheet, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface ProfilePhotoProps {
  widthSize?: number;
  heightSize?: number;
  photoUrl?: ImageSourcePropType | string;
  statusMessage?: string;
}

function ProfilePhoto({ widthSize, heightSize, photoUrl, statusMessage }: ProfilePhotoProps) {
  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            widthSize ? { width: widthSize } : { width: 190 },
            heightSize ? { height: heightSize } : { height: 190 },
          ]}
        >
          <Image style={styles.animalPhoto} source={photoUrl as any} />

          {statusMessage && (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.statusContainer}
              ></TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    position: 'absolute',
    top: '7%',

    elevation: 100,
    zIndex: 1000,

    justifyContent: 'center',
    alignItems: 'center',
  },

  statusContainer: {
    width: 40,
    height: 40,

    position: 'absolute',
    bottom: -5,
    right: 25,

    borderRadius: 40,
  },

  circle: {
    width: 190,
    height: 190,

    borderRadius: 100,
    backgroundColor: globalStyles.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    justifyContent: 'center',
    alignItems: 'center',
  },

  animalPhoto: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
});

export default ProfilePhoto;
