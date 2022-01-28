import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimalData } from '../../types/AnimalData';
import AnimalElement from '../AnimalElement';

import Background from '../Background';
import BackgroundHeader from '../BackgroundHeader';
import NoAnimalAlert from '../NoAnimalAlert';
import Scroll from '../Scroll';

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
            <Scroll>
              <>
                {animalData?.map((item, index) => {
                  return (
                    <View style={styles.container} key={index}>
                      <AnimalElement animalData={{arrayKey: index, ...item}}  />
                    </View>
                  );
                })}
              </>
            </Scroll>
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
