import { Alert } from "react-native"

export const showError = (errorMessage: string, customErrorMessage?: string) => {
  console.log(errorMessage)

  if(customErrorMessage) {
    Alert.alert(customErrorMessage)
  }
}