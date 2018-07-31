
import { Alert } from 'react-native';

const ErrorPopUp = (errorCode) => {
  let errorMessage;

  switch (errorCode) {
    case 'auth/invalid-email':
      errorMessage = 'Please enter a valid email address';
      break;
    case 'auth/user-disabled':
      errorMessage = 'This user account has been disabled';
      break;
    case 'auth/user-not-found':
      errorMessage = 'User not found';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Incorrect password';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'Email already in use';
      break;
    case 'auth/weak-password':
      errorMessage = 'Weak password - Must be minimum 6 characters';
      break;
    default:
      errorMessage = 'Something went wrong, please try again';
  }

  return Alert.alert(
    'Oops',
    `${errorMessage}`,
    [
      { text: 'OK' },
    ],
  );
};

export default ErrorPopUp;