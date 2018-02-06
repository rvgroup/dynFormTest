import { Platform, Dimensions } from 'react-native';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  
  return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 || dimen.width === 812)
  );
}