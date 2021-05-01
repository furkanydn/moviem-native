import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {THEME} from '../../utils/theme';

function WatchlistAdd() {
  return (
    <Svg
      width={THEME.specification.mediumICON}
      height={THEME.specification.mediumICON}
      viewBox="0 0 48 48"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 20H4v4h24v-4zm0-8H4v4h24v-4zm8 16v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM4 32h16v-4H4v4z"
        fill="#f8f8f8"
      />
    </Svg>
  );
}

export default WatchlistAdd;
