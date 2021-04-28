import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {THEME} from '../../utils/theme';

function SvgComponent() {
  return (
    <Svg
      width={THEME.specification.mediumICON}
      height={THEME.specification.mediumICON}
      viewBox="0 0 485 485"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M343.611 22.543c-22.614 0-44.227 5.184-64.238 15.409-13.622 6.959-26.135 16.205-36.873 27.175-10.738-10.97-23.251-20.216-36.873-27.175-20.012-10.225-41.625-15.409-64.239-15.409C63.427 22.543 0 85.97 0 163.932c0 55.219 29.163 113.866 86.678 174.314 48.022 50.471 106.816 92.543 147.681 118.95l8.141 5.261 8.141-5.261c40.865-26.406 99.659-68.479 147.681-118.95C455.837 277.798 485 219.151 485 163.932c0-77.962-63.427-141.389-141.389-141.389z"
        fill="#f8f8f8"
      />
    </Svg>
  );
}

const FavoriteFull = React.memo(SvgComponent);
export default FavoriteFull;
