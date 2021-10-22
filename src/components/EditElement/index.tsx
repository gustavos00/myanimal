import React, { ReactNode } from 'react';
import { Image, Touchable, TouchableOpacity } from 'react-native';

interface EditElementProps {
  imageName: string;
}

function EditElement({ imageName }: EditElementProps) {
  let image

  switch (imageName) {
    case 'edit':
      image = require('../../assets/img/edit.png')
      break;

    case 'delete':
      image = require('../../assets/img/delete.png')
      break;
  
    default:
      break;
  }
  return (
    <>
      <TouchableOpacity activeOpacity={.7} onPress={(e) => console.log('a')}>
        <Image source={image} /> 
      </TouchableOpacity>
    </>
  );
}

export default EditElement;
