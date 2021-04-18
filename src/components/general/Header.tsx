import React from 'react';
import {isNil} from 'lodash';
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';

// Uygulama İçi
import {THEME} from '../../utils/theme';
import {ChevronLeft} from '../../icons';
import {TextView, } from '../index'
