import {TextStyle} from 'react-native';
import {ValuesOf} from './type';

// Gerekli Tiplerin Hazırlanması
interface FONT {
  weights: FontWeightKey[];
  styles: FontStyle[];
}
interface FONTS {
  Inter: FONT;
}
interface FONTStyleParams {
  family?: FontFamily;
  weight?: FontWeightKey;
  style?: FontStyle;
}

type FontFamily = keyof typeof fonts;
type FontWeight = ValuesOf<Pick<TextStyle, 'fontWeight'>>;
type FontWeightKey = keyof typeof fontWeightMapping;
type FontStyle = ValuesOf<Pick<TextStyle, 'fontStyle'>>;

// Font Ağırlık Yönetimi
const fonts: FONTS = {
  Inter: {
    weights: [
      'Thin',
      'ExtraLight',
      'Light',
      'Regular',
      'Medium',
      'SemiBold',
      'Bold',
      'ExtraBold',
      'Black',
    ],
    styles: ['normal'],
  },
};

const fontWeightMapping: Record<string, FontWeight> = {
  Thin: '100',
  ExtraLight: '200',
  Light: '300',
  Regular: '400',
  Medium: '500',
  SemiBold: '600',
  Bold: '700',
  ExtraBold: '800',
  Black: '900',
};

// Dışarı Aktarılacak Yapıların Hazırlanması
export const getFontStyle = (params: FONTStyleParams = {}): TextStyle => {
  const {family = 'Inter', weight = 'Regular', style = 'normal'} = params;
  const {weights, styles} = fonts[family];

  const WeightSupported = weights.includes(weight);
  const StyleSupported = styles.includes(style);
  !WeightSupported || StyleSupported
    ? console.warn(`[FONTS] ${family}-${weight}-${style} is not supported`)
    : console.log('fonts installed successfully');

  const fontWeight = WeightSupported ? weight : 'Regular';
  const fontStyle = StyleSupported ? style : 'normal';

  // İtalik yazı tiplerini kullanmadığımız için onları çıkaracağız
  const extra = `${fontWeight}${fontStyle === 'italic' ? 'Italic' : ''}`;

  return {
    fontFamily: `${family}-${extra}`,
  };
};
