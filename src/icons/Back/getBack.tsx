import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {THEME} from '../../utils/theme';

function GetBack() {
  return (
    <Svg
      width={THEME.specification.smallICON}
      height={THEME.specification.smallICON}
      viewBox="0 0 512 512"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M148.32 255.76L386.08 18c4.053-4.267 3.947-10.987-.213-15.04a10.763 10.763 0 00-14.827 0L125.707 248.293a10.623 10.623 0 000 15.04L371.04 508.667c4.267 4.053 10.987 3.947 15.04-.213a10.763 10.763 0 000-14.827L148.32 255.76z"
        fill="#121212"
      />
    </Svg>
  );
}

export default GetBack;
