import React from 'react';
import {Image, ImageStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getMediumImageUrl} from '../../api/urlKEY';
import {config} from '../../config/config';

// Yardımcı Nesne
export const getCardPosterUrl = (path: string) => getMediumImageUrl(path);

// Durum ve Özellikler
type OwnProps = {
  path: string;
  style?: ImageStyle;
};

type Props = OwnProps;

// Bileşen
const CardImage = ({path, style}: Props) =>
  // Poster resmi titremesini kaldırmak için IOS'ta FastImage kullanılmayacaktır.
  React.createElement(config.isAndroid ? Image : (FastImage as any), {
    style: style,
    resizeMode: 'cover',
    source: {uri: getMediumImageUrl(path)},
  });

export default React.memo(CardImage);
