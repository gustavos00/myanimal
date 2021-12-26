import { Alert } from 'react-native';

export const showError = (
  errorMessage: string,
  customErrorMessage?: string
) => {
  if (customErrorMessage) {
    Alert.alert(customErrorMessage);
  }

  throw new Error(errorMessage);
};
