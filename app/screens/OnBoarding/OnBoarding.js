import React, {useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
// Sabitler
import {images, theme} from '../../constants';
import Connect from '../../icons/Connect/Connect';
import {phoneHeight, phoneWidth} from '../../utils/dimens';
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

const checkConnection = NetInfo.addEventListener(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
  console.log('Is Reachable?', state.isInternetReachable);
  return state.isConnected;
});

const OnBoarding = () => {
  const scrollX = new Animated.Value(0);
  const [completed, setCompleted] = React.useState(false);
  // Sona gelindiğinde yönlendirme yapılması
  const navigate = useNavigation();
  const goMain = useCallback(() => {
    navigate.navigate('Main', {
      IsExplorer: true,
    });
  }, [navigate]);
  // Eğer kullanıcı son sayfaya gelirse
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
            <TouchableOpacity style={styles.buttonContainer} onPress={goMain}>
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
  return checkConnection ? (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.netContainer}>
        <Connect />
      </View>
      <Text style={styles.netDescription}>Sorry, something went wrong.</Text>
      <Text style={styles.netDescriptionMessage}>Network request failed.</Text>
      <Text style={styles.netDescription}>Please try again.</Text>
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
  netContainer: {
    width: phoneWidth - 24,
    height: phoneHeight / 2,
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
  netDescription: {
    ...FONTS.bodyFour,
    textAlign: 'center',
    color: COLORS.black,
    marginTop: 8,
  },
  netDescriptionMessage: {
    ...FONTS.bodyTwo,
    backgroundColor: COLORS.whatsgreen,
    opacity: 0.7,
    padding: 8,
    marginTop: 8,
    borderRadius: 12,
    textAlign: 'center',
    color: COLORS.red,
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
