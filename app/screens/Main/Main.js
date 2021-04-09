import React, {memo, useCallback} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {keyExpo} from '../../utils/index';

import {FirstPopularSlide} from '../../components/index';
import {COLORS} from '../../constants';

const dataPopular = [
  {
    img: require('app/assets/images/dimg.jpg'),
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
  {
    img: require('app/assets/images/dimg.jpg'),
    name: 'X-Men: Apocalypse',
    rate: 6.5,
    review: 6.5,
    time: 113,
    date: '2021-03-24',
  },
  {
    img: require('app/assets/images/dimg.jpg'),
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

  return <View />;
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
});
