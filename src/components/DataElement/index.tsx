import React, { useEffect, useState } from 'react';
import globalStyles from '../../assets/styles/global';
import ActionsElements from '../ActionsElements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, ScrollView, Image, ImageSourcePropType } from 'react-native';

interface DataElementProps {
  title: any;
  subTitle: string;
  photoUrl: string | ImageSourcePropType;
  photoFlagType?: string;
  haveSlider?: boolean;
  handleOnPress?: () => void;

  sliderTrueText?: string;
  sliderFalseText?: string;

  sliderTrueColor?: string;
  sliderFalseColor?: string;

  sliderTrueFunction?: () => void;
  sliderFalseFunction?: () => void;
}

function DataElement({
  title,
  subTitle,
  photoUrl,
  photoFlagType,
  haveSlider,
  handleOnPress,
  sliderTrueText,
  sliderFalseText,
  sliderTrueColor,
  sliderFalseColor,
  sliderTrueFunction,
  sliderFalseFunction,
}: DataElementProps) {
  const dynamicPhotoUrl = typeof photoUrl === 'string' ? { uri: photoUrl } : photoUrl;
  const [photoFlag, setPhotoFlag] = useState<ImageSourcePropType | undefined>();
  const [photoFlagColor, setPhotoFlagColor] = useState<string>();

  useEffect(() => {
    switch (photoFlagType) {
      case 'missingReport':
        setPhotoFlag(require('../../assets/img/warning.png'));
        setPhotoFlagColor('#FFCD83');
        break;

      case 'alreadyDone':
        setPhotoFlag(require('../../assets/img/done.png'));
        setPhotoFlagColor('#A7A5EF');
        break;
        
      case 'soon':
        setPhotoFlag(undefined)
        setPhotoFlagColor(undefined)
        break;
    }
  }, [photoFlagType]);

  return (
    <>
      <View style={styles.element}>
        <ScrollView
          horizontal
          contentContainerStyle={{ alignItems: 'center' }}
          style={styles.container}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.contentContainer}>
              <View>
                <Image source={dynamicPhotoUrl} style={styles.icon} />
                <View style={[styles.photoFlagContainer, { backgroundColor: photoFlagColor }]}>
                  {photoFlag && <Image source={photoFlag} style={styles.photoFlagElement} />}
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{title}</Text>
                <Text style={styles.localityText}>{subTitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
          {haveSlider && (
            <ActionsElements
              trueText={sliderTrueText}
              falseText={sliderFalseText}
              trueColor={sliderTrueColor}
              falseColor={sliderFalseColor}
              trueFunction={sliderTrueFunction}
              falseFunction={sliderFalseFunction}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  element: {
    height: 105 + globalStyles.smallerGap / 2,
    marginTop: globalStyles.smallerGap,
    marginVertical: 10,
    marginHorizontal: 10,

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

  icon: {
    width: globalStyles.fullDeviceWidth * 0.22,
    height: globalStyles.fullDeviceWidth * 0.22,
    borderRadius: globalStyles.smallerGap,

    position: 'relative',
  },

  photoFlagContainer: {
    width: 25,
    height: 25,

    position: 'absolute',
    top: -5,
    right: -5,

    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  photoFlagElement: {
    width: 17,
    height: 17,
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

export default DataElement;
