import React, { ReactNode } from 'react';
import { Image, Touchable, TouchableOpacity } from 'react-native';

interface EditElementProps {
  photoName: string;
}

function EditElement({ photoName }: EditElementProps) {
  let photo

  switch (photoName) {
    case 'edit':
      photo = require('../../assets/img/edit.png')
      break;

    case 'delete':
      photo = require('../../assets/img/delete.png')
      break;
  
    default:
      break;
  }
  return (
    <>
      <TouchableOpacity activeOpacity={.7} onPress={(e) => console.log('a')}>
        <Image source={photo} /> 
      </TouchableOpacity>
    </>
  );
}

export default EditElement;
