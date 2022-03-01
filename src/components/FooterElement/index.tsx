import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

interface FooterElementProps {
  photoName: string;
  active?: boolean;
  handleClick: () => void;
}

function FooterElement({ photoName, active, handleClick }: FooterElementProps) {
  let photo;

  switch (photoName) {
    case 'setting':
      photo = require('../../assets/img/setting.png');
      break;

    case 'home':
      photo = require('../../assets/img/home.png');
      break;

    case 'notification':
      photo = require('../../assets/img/notifications.png');
      break;

    case 'user':
      photo = require('../../assets/img/user.png');
      break;

    default:
      console.log('Error: #0301');
      break;
  }
  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <Image
          style={[styles.photo, active ? { opacity: 1 } : { opacity: 0.4 }]}
          source={photo}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: 32,
    height: 32,
  },
});

export default FooterElement;
