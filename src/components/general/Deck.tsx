import React from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State as GestureState,
} from 'react-native-gesture-handler';
import {phoneWidth, phoneHeight} from '../../utils/dimension';

// Yerel Olarak Burada Kullanılacak Bileşenler
const {add, multiply} = Animated;
const rotateAngle = 30;
const horizontalThresh = phoneWidth / 3;
const vertivalThresh = phoneHeight / 4;
const horizontalSwipeOut = phoneWidth * 1.5;
const getAnimatedDistance = (dx: Animated.Animated, dy: Animated.Animated) =>
  add(multiply(dx, dx), multiply(dy, dy));

// Bileşenler
export type SwipeDirect = 'left' | 'right' | 'top';
export interface SwipeThresh {
  toLeft: Animated.Animated;
  toRight: Animated.Animated;
  toTop: Animated.Animated;
}
export interface RenderCardParams {
  isTopCard: boolean;
  SwipeThresh?: SwipeThresh;
}

// Kullanılacak Durum ve Özellik Bileşenleri
type Props<ItemT> = {
  data: ItemT[];
  keyExtractor: (item: ItemT) => string;
  renderCard: (item: ItemT, params: RenderCardParams) => React.ReactElement;
  renderNoMoreCards?: () => React.ReactElement;

  onSwipeStart?: (item: ItemT) => void;
  onSwipeEnd?: (item: ItemT) => void;
  onSwipe?: (item: ItemT) => void;
  onSwipeLeft?: (item: ItemT) => void;
  onSwipeRight?: (item: ItemT) => void;
  onSwipeTop?: (item: ItemT) => void;
};
const initState = {
  deckHeight: phoneHeight,
  hasTouchStarted: false,
};
type State = typeof initState;

// Kullanılacak Ana Bileşen
class Deck<ItemT> extends React.PureComponent<Props<ItemT>, State> {
  state = initState;
  drag = new Animated.ValueXY({x: 0, y: 0});
  drageDistance = getAnimatedDistance(this.drag.x, this.drag.y);
  touchStartTimer = 0;

  onDeckLayout = ({nativeEvent}: LayoutChangeEvent) =>
    this.setState({deckHeight: nativeEvent.layout.height});

  onPanGestureEvent = Animated.event(
    [{nativeEvent: {translationX: this.drag.x, translationY: this.drag.y}}],
    {
      useNativeDriver: true,
    },
  );

  onSwipeComplete = (direction: SwipeDirect) => {
    const {data, onSwipeLeft, onSwipeRight, onSwipeTop, onSwipe} = this.props;
    const swipeFunction =
      direction === 'left'
        ? onSwipeLeft
        : direction === 'right'
        ? onSwipeRight
        : onSwipeTop;
    const item = data[0];

    onSwipe && onSwipe(item);
    swipeFunction && swipeFunction(item);
    this.drag.setValue({x: 0, y: 0});
  };

  clearCardSwipe = () => {
    Animated.spring(this.drag, {
      toValue: {x: 0, y: 0},
      useNativeDriver: true,
    }).start();
  };

  handleSwipe = ({
    translationX,
    translationY,
  }: PanGestureHandlerStateChangeEvent['nativeEvent']) => {
    const swipeDuration = new Date().getTime() - this.touchStartTimer;
    const fastSwipe = swipeDuration < 225;
    const fastSwipeThresh = 25;
    const adX = Math.abs(translationX);
    const adY = Math.abs(translationY);
    const fastHorizontal = fastSwipe && adX > fastSwipeThresh && adX > adY;
    const fastVertical = fastSwipe && adY > fastSwipeThresh;

    if (fastHorizontal || adX > horizontalThresh) {
      this.forceSwipe(translationX > 0 ? 'right' : 'left');
    } else if (fastVertical || adY > vertivalThresh) {
      if (translationY < 0) {
        this.forceSwipe('top');
      } else {
        this.clearCardSwipe();
      }
    } else {
      this.clearCardSwipe();
    }
  };

  forceSwipe = (direction: SwipeDirect) => {
    const swipeDuration = 200;
    const toValueMap: Record<SwipeDirect, {x: number; y: number}> = {
      left: {x: -horizontalSwipeOut, y: 0},
      right: {x: horizontalSwipeOut, y: 0},
      top: {x: 0, y: -phoneHeight},
    };
    Animated.timing(this.drag, {
      toValue: toValueMap[direction],
      duration: swipeDuration,
      useNativeDriver: true,
    }).start(() => this.onSwipeComplete(direction));
  };

  getSwipeThresh = (): SwipeThresh => {
    const {x, y} = this.drag;
    const toLeft = x.interpolate({
      inputRange: [-horizontalThresh, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const toRight = x.interpolate({
      inputRange: [0, horizontalThresh],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const toTop = y.interpolate({
      inputRange: [-vertivalThresh, -20],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return {toLeft, toRight, toTop};
  };

  onPanGestureStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    const {data, onSwipeStart, onSwipeEnd} = this.props;
    const {deckHeight} = this.state;
    const {state: gestureState, y} = event.nativeEvent;
    const item = data[0];

    if (gestureState === GestureState.BEGAN) {
      onSwipeStart && onSwipeStart(item);
      this.touchStartTimer = new Date().getTime();
      this.setState({hasTouchStarted: y < deckHeight * 0.5});
    } else if (
      gestureState === GestureState.CANCELLED ||
      gestureState === GestureState.END
    ) {
      onSwipeEnd && onSwipeEnd(item);
      this.handleSwipe(event.nativeEvent);
    }
  };

  getCardAnimatedStyle = () => {
    const secondCardInitScale = 0.9;
    const scale = this.drageDistance.interpolate({
      inputRange: [0, 100, 14400],
      outputRange: [secondCardInitScale, secondCardInitScale, 1],
      extrapolate: 'clamp',
    });
    return {transform: [{scale}]};
  };

  getTopCardAnimatedStyle = () => {
    const {hasTouchStarted} = this.state;
    const {x: translateX, y: translateY} = this.drag;
    const rotate = translateX.interpolate({
      inputRange: [0, horizontalSwipeOut],
      outputRange: ['0deg', `${hasTouchStarted ? '' : '-'}${rotateAngle}deg`],
    });
    return {transform: [{rotate}, {translateX}, {translateY}]};
  };

  renderTopCard = (item: ItemT) => {
    const {keyExtractor, renderCard} = this.props;
    const params: RenderCardParams = {
      isTopCard: true,
      SwipeThresh: this.getSwipeThresh(),
    };
    return (
      <PanGestureHandler
        avgTouches
        key={keyExtractor(item)}
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanGestureStateChange}>
        <Animated.View
          style={[styles.topCardContainer, this.getTopCardAnimatedStyle()]}>
          {renderCard(item, params)}
        </Animated.View>
      </PanGestureHandler>
    );
  };
  renderBottomCard = (item: ItemT) => {
    const {keyExtractor, renderCard} = this.props;
    const params: RenderCardParams = {isTopCard: false};
    return (
      <Animated.View
        key={keyExtractor(item)}
        style={[styles.cardStyle, this.getCardAnimatedStyle()]}>
        {renderCard(item, params)}
      </Animated.View>
    );
  };
  renderCards = () => {
    const {data} = this.props;
    return data
      .map((item, index) => {
        if (index > 1) {
          return null;
        }
        if (index === 0) {
          return this.renderTopCard(item);
        }
        return this.renderBottomCard(item);
      })
      .reverse();
  };
  render() {
    const {data, renderNoMoreCards} = this.props;

    return (
      <View style={styles.container} onLayout={this.onDeckLayout}>
        <View style={StyleSheet.absoluteFill}>
          {data.length < 2 && renderNoMoreCards?.()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  topCardContainer: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Deck;
