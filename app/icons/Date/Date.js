import * as React from 'react';
import Svg, {Path, Circle, G} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      height={20}
      viewBox="0 0 64 64"
      width={20}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M50 7c2.21 0 4 1.79 4 4v41c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V11c0-2.21 1.79-4 4-4z"
        fill="#ded8d0"
      />
      <Path
        d="M6 56h44c2.21 0 4-1.79 4-4V30.358c-9.464 10.354-25.474 17.97-52 19.393V52c0 2.21 1.79 4 4 4z"
        fill="#c9c4bd"
      />
      <Circle cx={51} cy={51} fill="#f5a947" r={11} />
      <Path
        d="M57.592 42.209A10.937 10.937 0 0159.8 48.8c0 6.075-4.925 11-11 11-2.476 0-4.753-.828-6.591-2.209C44.215 60.264 47.4 62 51 62c6.075 0 11-4.925 11-11 0-3.6-1.736-6.785-4.408-8.791z"
        fill="#f09d3a"
      />
      <Path d="M54 17H2v-6a4 4 0 014-4h44a4 4 0 014 4z" fill="#e34e4b" />
      <Path
        d="M11 12a2 2 0 01-2-2V4a2 2 0 114 0v6a2 2 0 01-2 2zM22 12a2 2 0 01-2-2V4a2 2 0 114 0v6a2 2 0 01-2 2zM34 12a2 2 0 01-2-2V4a2 2 0 114 0v6a2 2 0 01-2 2zM45 12a2 2 0 01-2-2V4a2 2 0 114 0v6a2 2 0 01-2 2z"
        fill="#f5a947"
      />
      <G fill="#50b6cf">
        <Path d="M8 22h6v6H8zM19 22h6v6h-6zM30 22h6v6h-6zM41 22h6v6h-6zM8 33h6v6H8zM19 33h6v6h-6zM30 33h6v6h-6zM41 33h6v6h-6zM8 44h6v6H8zM19 44h6v6h-6zM30 44h6v6h-6z" />
      </G>
      <Path
        d="M46.625 55.781l-1.25-1.562 4.625-3.7V43h2v8.48z"
        fill="#223b5a"
      />
      <Circle cx={51} cy={51} fill="#223b5a" r={2} />
    </Svg>
  );
}

const Date = React.memo(SvgComponent);

export default Date;
