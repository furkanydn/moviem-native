import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

// Sabitler
import {images, theme} from '../../constants';
const {onBoardOne, onBoardTwo, onBoardThree} = images;

// Tema Nesneleri
const {COLORS, SIZES, FONTS} = theme;

// Kukla olarak kullanılacak veri
const onDummyData = [
  {
    title: 'Welcome',
    description:
      'Put simply, we live and breathe community and thats precisely what makes us different. We are incredibly proud of this.',
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
  const scrollX = new Animated.Value(0);
  const [completed, setCompleted] = React.useState(false);

  // Eğer kullanıcı son sayfaya geldiyse
  React.useEffect(() => {
    scrollX.addListener(({value}) => {
      if (Math.floor(value / SIZES.width) === onDummyData.length - 1) {
        setCompleted(true);
      }
    });
    return () => scrollX.removeListener();
  });
  // Render edilmesi gereken içerik
  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAligment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onDummyData.map((item, index) => (
          <View key={index} style={{width: SIZES.width}}>
            <View style={styles.imageContainer}>
              <Image
                source={item.img}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            {/*Ekrandaki Yazılar İçin Alan*/}
            <View style={styles.contentContainer}>
              <Text style={styles.header}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            {/*Ekrandaki Butonlar*/}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => console.log('press')}>
              <Text style={{...FONTS.h2, color: COLORS.white}}>
                {completed ? 'Lets go' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={styles.dotContainer}>
        {onDummyData.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 20, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, {width: dotSize}]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.navajowhite,
  },
  dotRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '30%' : '20%',
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.sky,
    alignContent: 'center',
    marginRight: 10,
    marginBottom: 25,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '10%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    position: 'absolute',
    bottom: '10%',
    left: 15,
    right: 15,
  },
  header: {
    ...FONTS.h1,
    color: COLORS.forestgreen,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    ...FONTS.bodyThr,
    textAlign: 'center',
    color: COLORS.black,
    marginTop: SIZES.base,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: COLORS.amethyst,
  },
  buttonText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});

export default OnBoarding;
