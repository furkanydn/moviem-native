import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {THEME} from '../../utils/theme';

function SvgComponent() {
  return (
    <Svg
      width={THEME.specification.smallICON}
      height={THEME.specification.smallICON}
      viewBox="0 0 512 512"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M503.871 231.434L267.071 4.449c-6.184-5.933-15.958-5.933-22.141 0L7.895 231.668C2.879 236.684 0 243.594 0 250.656c0 14.7 11.969 26.668 26.668 26.668H64v192c0 23.57 19.094 42.664 42.668 42.664h298.664c23.574 0 42.668-19.093 42.668-42.664v-192h37.332c14.7 0 26.668-11.969 26.668-26.668 0-7.062-2.879-13.972-8.129-19.222zm0 0"
        fill="#f8f8f8"
      />
    </Svg>
  );
}

const HomeIcon = React.memo(SvgComponent);
export default HomeIcon;
