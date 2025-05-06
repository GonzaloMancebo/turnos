import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ScreenDimensions = {
  ScreenWidth: width,
  ScreenHeight: height,
};

export default ScreenDimensions;
