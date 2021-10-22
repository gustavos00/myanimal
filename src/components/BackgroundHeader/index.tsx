import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';

import globalStyles from '../../assets/styles/global';
import Underline from '../Underline';

interface BackgroundHeaderProps {
  text: string,
  isEditing?:boolean
}

function BackgroundHeader({ isEditing, text }: BackgroundHeaderProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>{text}</Text>

        <View style={{width: 24, height: 24}}>
          {isEditing &&
            <>
              <Image style={{width: 24, height: 24}} source={require('../../assets/img/save.png')}/>
            </>
          }
        </View>

      </View>

      <Underline />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 28,
    paddingRight: 28,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,

    color: globalStyles.black
  },
})

export default BackgroundHeader;
