import React, { ReactNode } from 'react';
import { TouchableOpacity, Image ,StyleSheet } from 'react-native';

interface FooterElementProps {
  imageName: string,
  active?: boolean,
  handleClick: () => void
}

function FooterElement({ imageName, active, handleClick }: FooterElementProps) {
  let image 

  switch (imageName) {
    case 'setting':
      image = require('../../assets/img/setting.png')
      break;

    case 'home':
      image = require('../../assets/img/home.png')
      break;

    case 'notification':
      image = require('../../assets/img/notifications.png')
      break;

    case 'user':
      image = require('../../assets/img/user.png')
      break;
  
    default:
      console.log('Error: #0301')
      break;
  }
  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <Image style={[styles.image, active ? {opacity: 1,} : {opacity: .4}]} source={image} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  }
})

export default FooterElement;
