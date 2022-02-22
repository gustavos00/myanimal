import React from 'react';
import FastImage from 'react-native-fast-image';
import globalStyles from '../../assets/styles/global';
import ActionsElements from '../ActionsElements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

interface DataElementProps {
  title: any;
  subTitle: string;
  photoUrl: string;
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
  haveSlider,
  handleOnPress,
  sliderTrueText,
  sliderFalseText,
  sliderTrueColor,
  sliderFalseColor,
  sliderTrueFunction,
  sliderFalseFunction,
}: DataElementProps) {
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
              <FastImage source={{ uri: photoUrl }} style={styles.icon} />

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

export default DataElement;
