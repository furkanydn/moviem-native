import React from 'react';
import {SafeAreaView, View, StyleSheet, Animated, Image} from 'react-native';

// Sabit Değerler
import {images, theme} from '../../constants';
const {onBoardOne, onBoardTwo, onBoardThree} = images;

// Tema nesneleri
const {COLORS, SIZES, FONTS} = theme;

// Kukla olarak kullanılacak veri
const onDummyData = [
  {
    title: 'Welcome',
    description:
      'Millions of movies, TV shows and people to discover. Explore now.',
    img: onBoardOne,
  },
  {
    title: 'Join Today',
    description:
      "Get access to maintain your own personal lists, regardless if it's in theatres, on TV or available on popular streaming services",
    img: onBoardTwo,
  },
  {
    title: 'Enjoy Ad Free',
    description:
      'Filter by the streaming services you subscribe to and find something to watch, of course, without ads...',
    img: onBoardThree,
  },
];

const OnBoarding = () => {
  // Render edilmesi gereken nesneler
  function renderContent() {
    return (
      <Animated.ScrollView>
        {onDummyData.map((item, index) => (
          <View key={index}>
            <View>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{width: 100, height: 100}}
              />
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default OnBoarding;
