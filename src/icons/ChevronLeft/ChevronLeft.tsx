import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {THEME} from '../../utils/theme';

function ChevronLeft() {
  return (
    <Svg
      width={THEME.specification.mediumICON}
      height={THEME.specification.mediumICON}
      viewBox="0 0 512 512"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M423.873 79.747L344.126 0 88.127 255.999 344.126 512l79.747-79.748L247.62 255.999 423.873 79.747zm-25.784 352.505l-53.963 53.963-230.214-230.216L344.126 25.784l53.963 53.963-176.253 176.252 176.253 176.253z"
        fill="#f8f8f8"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M210.05 194.847L337.677 67.22l12.892 12.893-127.626 127.626z"
        fill="#f8f8f8"
      />
    </Svg>
  );
}

export default ChevronLeft;
