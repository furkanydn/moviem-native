import React, {memo, useCallback} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import keyExpo from '../../utils/keyExpo';

import {FirstPopularSlide} from '../../components/index';

import {images, theme} from '../../constants';
const {COLORS, FONTS} = theme;
const {mainPoster, swiperImage} = images;

import {phoneWidth} from '../../utils/dimens';
import {Best} from '../../icons/index';

const swiperData = [
  {
    id: 0,
    path: swiperImage,
    title: 'Ringing',
  },
  {
    id: 1,
    path: swiperImage,
    title: 'Ringing',
  },
  {
    id: 2,
    path: swiperImage,
    title: 'Ringing',
  },
  {
    id: 3,
    path: swiperImage,
    title: 'Ringing',
  },
  {
    id: 4,
    path: swiperImage,
    title: 'Ringing',
  },
];

const dataPopular = [
  {
    img: require('../../assets/images/dimg.jpg'),
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
  {
    img: require('../../assets/images/dimg.jpg'),
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
  {
    img: require('../../assets/images/dimg.jpg'),
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
];

const Home = memo(() => {
  const navigate = useNavigation();
  // Seçili filme tıkladığında gidilecek adres
  const showMovie = useCallback(() => {
    navigate.navigate('OnBoarding', {
      IsExplorer: true,
    });
  }, [navigate]);

  // Render edilmesi gereken ana comp
  const _renderMoviesList = useCallback(
    ({item}) => {
      return (
        <FirstPopularSlide
          img={item.img}
          name={item.name}
          rate={item.rate}
          review={item.review}
          time={item.time}
          date={item.date}
          onPress={showMovie}
        />
      );
    },
    [showMovie],
  );

  const renderMovies = useCallback(() => {
    return (
      <View>
        <FlatList
          data={dataPopular}
          renderItem={_renderMoviesList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExpo}
          horizontal={true}
          style={style.popular_cards}
        />
      </View>
    );
  }, [_renderMoviesList]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderHeaderContent = useCallback(() => {
    return (
      <View>
        <Swiper
          style={style.swiper}
          dotStyle={style.swiper_dot}
          activeDotStyle={style.swiper_dot_active}
          dotColor={COLORS.dot}
          activeDotColor={COLORS.white}>
          {swiperData.map(data => {
            return (
              <Image
                style={style.swiper_image}
                source={data.path}
                key={data.id}
              />
            );
          })}
        </Swiper>
        <View style={style.swiper_text}>
          <Best />
        </View>
        <Text style={style.popular_card_header}>What's Popular</Text>
        <View>{renderMovies(dataPopular)}</View>
      </View>
    );
  });

  return (
    <View style={style.flex}>
      <FlatList
        ListHeaderComponent={renderHeaderContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExpo}
        bounces={false}
        contentContainerStyle={style.root_flat}
      />
    </View>
  );
});

export default Home;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  swiper: {
    height: (phoneWidth / 350) * 200,
  },
  swiper_dot: {
    height: 8,
    width: 12,
    backgroundColor: COLORS.navajowhite,
  },
  swiper_dot_active: {
    height: 8,
    width: 12,
    backgroundColor: COLORS.salmon,
  },
  swiper_image: {
    width: phoneWidth,
    height: (phoneWidth / 350) * 200,
  },
  swiper_text: {
    position: 'absolute',
    top: 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root_flat: {
    paddingBottom: 24,
    backgroundColor: COLORS.white,
  },
  popular_card_header: {
    ...FONTS.h3,
    color: COLORS.behance,
    fontWeight: '500',
    paddingTop: 24,
    paddingLeft: 16,
  },
  popular_cards: {
    flexWrap: 'wrap',
    paddingLeft: 16,
    paddingTop: 16,
  },
});
