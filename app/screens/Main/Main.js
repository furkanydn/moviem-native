import React, {memo, useCallback} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import keyExpo from '../../utils/keyExpo';

import {FirstPopularSlide} from '../../components/index';
import {COLORS} from '../../constants';
import {mainPoster, swiperImage} from '../../constants/images';
import {phoneWidth} from '../../utils/dimens';

const swiperData = [
  {
    id: 0,
    path: swiperImage,
  },
  {
    id: 1,
    path: swiperImage,
  },
  {
    id: 2,
    path: swiperImage,
  },
  {
    id: 3,
    path: swiperImage,
  },
  {
    id: 4,
    path: swiperImage,
  },
];

const dataPopular = [
  {
    img: mainPoster,
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
  {
    img: mainPoster,
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
  {
    img: mainPoster,
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
];

const Home = memo(() => {
  const navigate = useNavigation();
  const showMovie = useCallback(() => {
    navigate.navigate('OnBoarding', {
      IsExplorer: true,
    });
  }, [navigate]);

  // Render edilmesi gereken ana comp
  const _renderMoviesList = useCallback(
    ({movie}) => {
      return (
        <FirstPopularSlide
          img={movie.img}
          name={movie.name}
          rate={movie.rate}
          review={movie.review}
          time={movie.time}
          date={movie.date}
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
        />
      </View>
    );
  }, [_renderMoviesList]);

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
  root_flat: {
    paddingBottom: 24,
    backgroundColor: COLORS.white,
  },
});
