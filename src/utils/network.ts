import {AxiosError} from 'axios';
import {Image, Linking} from 'react-native';

export const isNetworkError = (error: any) => !error.response;
export const isServerError = (error: AxiosError) =>
  !!error.code?.startsWith('A');
export const safeURLOpen = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    supported && Linking.openURL(url);
  });
};

// Resimler prefetching hatası nedeniyle IOS'ta çalışmamaktadır.
// queryCache kullanılabilir ancak yavaş çalışma performansı nedeniyle kullanmamaktayız.
// https://github.com/facebook/react-native/issues/28557
export const prefetchImage = (url: string) => Image.prefetch(url);
export const prefecthImages = (urls: string[]) =>
  Promise.all(urls.map(url => prefetchImage(url)));
