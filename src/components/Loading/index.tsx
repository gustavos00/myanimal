import React from 'react';
import LottieView from 'lottie-react-native';

import BackgroundFilter from '../BackgroundFilter';

function Loading() {
  return (
    <>
      <BackgroundFilter>
       <LottieView source={require('../../assets/animations/loading.json')} autoPlay loop/>
      </BackgroundFilter>
    </>
  );
}

export default Loading;
