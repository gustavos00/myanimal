import React from "react";
import Svg, { Path } from "react-native-svg";

function FooterWave() {
  return (
    <>
        <Svg
          width="100%" 
          height="59" 
          viewBox="0 0 377 57" 
        >
          <Path
            fill="#FFE1D0"
            d="M0.000488281 2.87803L16.0005 1.67532C31.0005 0.472612 63.0005 -1.93281 94.0005 2.87803C126 7.08752 157 18.5133 189 27.5336C220 36.5539 251 43.1688 283 38.9593C314 34.1485 346 18.5133 361 10.6957L377 2.87803V57H361C346 57 314 57 283 57C251 57 220 57 189 57C157 57 126 57 94.0005 57C63.0005 57 31.0005 57 16.0005 57H0.000488281V2.87803Z"
          />
        </Svg>
    </>
  );
}

export default FooterWave;
