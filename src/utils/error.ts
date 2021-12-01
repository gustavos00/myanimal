import { Alert } from 'react-native';

export const showError = (
  errorMessage: string,
  customErrorMessage?: string
) => {
  if (customErrorMessage) {
    Alert.alert(customErrorMessage as string);
  }

  throw new Error(errorMessage);
};
