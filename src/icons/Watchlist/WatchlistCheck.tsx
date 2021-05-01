import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {THEME} from '../../utils/theme';

function WatchlistCheck() {
  return (
    <Svg
      width={THEME.specification.mediumICON}
      height={THEME.specification.mediumICON}
      viewBox="0 0 48 48"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 20H4v4h24v-4zm0-8H4v4h24v-4zM4 32h16v-4H4v4zm39-9l3 3-13.99 14L23 31l3-3 6.01 6L43 23z"
        fill="#f8f8f8"
      />
    </Svg>
  );
}

export default WatchlistCheck;
