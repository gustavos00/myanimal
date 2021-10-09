import React from 'react';
import { Image, Text} from 'react-native';

interface AnimalDataElementProps {
  imageName: string,
  value: string,
}

function AnimalDataElement({ imageName, value }: AnimalDataElementProps) {
  let image

  switch(imageName) {
    case 'facebook':
      image = require('../../assets/img/facebookLogo.png')
      break;

    case 'google':
      image = require('../../assets/img/googleLogo.png')
      break; 
    default:
      console.log('Error finding animalDataElement image')
  }

  return (
    <>
      <Image source={image} />
      <Text>{value}</Text>
    </>
  );
}

export default AnimalDataElement;
