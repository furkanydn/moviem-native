import * as React from 'react';
import Svg, {Rect, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Rect opacity={0.01} width={16} height={16} fill="black" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.56853 0.957314V1.58244V2.41057V3.2387V3.72234C5.56853 4.25121 5.99698 4.67965 6.52585 4.67965C7.05454 4.67965 7.48316 4.25121 7.48316 3.72234V3.2387V2.41057V1.58244V0.957314C7.48325 0.428448 7.05463 0 6.52594 0C5.99698 0.000433213 5.56853 0.428881 5.56853 0.957314ZM23.9999 5.03177V5.389V8.65022V20.1363C23.9999 22.2346 21.6635 23.9426 19.5653 23.9426H3.81735C1.71887 23.9426 0.0112305 22.2346 0.0112305 20.1363V8.64979V5.38856V5.03134C0.0112305 3.18464 2.3106 1.6761 4.32608 1.59162V2.41967V3.25698V3.72243C4.32608 4.93534 5.31268 5.92202 6.52542 5.92202C7.73824 5.92202 8.72493 4.93534 8.72493 3.72243V3.23879V2.41066V1.58253H15.2742V2.41066V3.23879V3.72243C15.2742 4.93534 16.2608 5.92202 17.4736 5.92202C18.6862 5.92202 19.6729 4.93534 19.6729 3.72243V3.24823V2.41568V1.5879C21.7223 1.64049 23.9999 3.16297 23.9999 5.03177ZM5.01123 9C4.45895 9 4.01123 9.44771 4.01123 10V12C4.01123 12.5523 4.45895 13 5.01123 13H7.01123C7.56352 13 8.01123 12.5523 8.01123 12V10C8.01123 9.44771 7.56352 9 7.01123 9H5.01123ZM4.01123 17C4.01123 16.4477 4.45895 16 5.01123 16H7.01123C7.56352 16 8.01123 16.4477 8.01123 17V19C8.01123 19.5523 7.56352 20 7.01123 20H5.01123C4.45895 20 4.01123 19.5523 4.01123 19V17ZM11.0112 16C10.4589 16 10.0112 16.4477 10.0112 17V19C10.0112 19.5523 10.4589 20 11.0112 20H13.0112C13.5635 20 14.0112 19.5523 14.0112 19V17C14.0112 16.4477 13.5635 16 13.0112 16H11.0112ZM10.0112 10C10.0112 9.44771 10.4589 9 11.0112 9H13.0112C13.5635 9 14.0112 9.44771 14.0112 10V12C14.0112 12.5523 13.5635 13 13.0112 13H11.0112C10.4589 13 10.0112 12.5523 10.0112 12V10ZM17.0112 9C16.4589 9 16.0112 9.44771 16.0112 10V12C16.0112 12.5523 16.4589 13 17.0112 13H19.0112C19.5635 13 20.0112 12.5523 20.0112 12V10C20.0112 9.44771 19.5635 9 19.0112 9H17.0112ZM16.5164 0.957747C16.5164 0.428881 16.945 0.000433213 17.4738 0.000433213C18.0025 0.000433213 18.4306 0.428881 18.4314 0.957314V1.58244V2.41057V3.2387V3.72277C18.4314 4.25164 18.0028 4.68009 17.4738 4.68009C16.9449 4.68009 16.5164 4.25164 16.5164 3.72277V3.23913V2.411V1.58287V0.957747Z"
        fill="url(#paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={23.9999}
          y1={0}
          x2={0.0112305}
          y2={0}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#82D84E" />
          <Stop offset={1} stopColor="#0EAD69" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

const Date = React.memo(SvgComponent);

export default Date;
