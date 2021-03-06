import { Dimensions } from "react-native"

const globalStyles = {
  mainColor: '#F19C79',
  
  white: '#fff',

  black: '#2B303A',
  darkGray: '#4F4F4F',
  lightGray: '#DBDBDB',
  gray: '#ADADAD',

  fullDeviceWidth: Dimensions.get('window').width,
  fullDeviceHeight: Dimensions.get('window').height,

  almostTheFullDeviceWidth: Dimensions.get('window').width / 1.2,
  almostTheFullDeviceHeight: Dimensions.get('window').height / 1.2,

  smallerGap: Dimensions.get('window').width * .04,
}

export default globalStyles