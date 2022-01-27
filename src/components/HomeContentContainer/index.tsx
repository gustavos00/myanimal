import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimalData } from '../../types/AnimalData';
import AnimalElement from '../AnimalElement';

import Background from '../Background';
import BackgroundHeader from '../BackgroundHeader';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';
import NoAnimalAlert from '../NoAnimalAlert';

interface HomeContentContainerProps {
  animalData: Array<AnimalData> | void;
}

function HomeContentContainer({ animalData }: HomeContentContainerProps) {
  return (
    <>
      <Background>
        {animalData?.length === 0 ? (
          <>
            <NoAnimalAlert />
          </>
        ) : (
          <>
            <BackgroundHeader text={'Your animals'} />
            {/**TO DO -> REMOVE KEYBOARD AVOID WRAPPER */}
            <KeyboardAvoidingWrapper>
              <>
                {animalData?.map((item, index) => {
                  return (
                    <View style={styles.container} key={index}>
                      <AnimalElement animalData={{arrayKey: index, ...item}}  />
                    </View>
                  );
                })}
              </>
            </KeyboardAvoidingWrapper>
          </>
        )}
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default HomeContentContainer;
