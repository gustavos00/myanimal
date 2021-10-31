import React, { ReactNode } from 'react';

import { Switch } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface StyledSwitchProps {
  enableFunction: (state : boolean) => void;
  enableValue: boolean
}

function StyledSwitch({ enableFunction, enableValue }: StyledSwitchProps) {
  const toggleSwitch = () => enableFunction(!enableValue);

  return (
    <>
        <Switch
          trackColor={{ false: globalStyles.white, true: globalStyles.mainColor }}
          thumbColor={enableValue ? globalStyles.white : globalStyles.mainColor}
          ios_backgroundColor={globalStyles.white}
          onValueChange={toggleSwitch}
          style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
          value={enableValue}
        />
    </>
  );
}

export default StyledSwitch;
