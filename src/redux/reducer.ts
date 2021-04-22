import {mapValues} from 'lodash';
import {combineReducers} from 'redux';
import {getStoredState, persistReducer} from 'redux-persist';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

//
import {authReducer,exploreReducer} from './indexIE';
