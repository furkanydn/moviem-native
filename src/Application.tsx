import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
//https://github.com/zoontek/react-native-bootsplash
import RNBootSplash from 'react-native-bootsplash';

//Uygulama içi
import {ToastMessage} from './components/index';
import {StyleSheets} from './StyleSheets';
import {
  startNetworkMonitoring,
  stopNetworkMonitoring,
} from './redux/network/action';
import navigationService from './routes/navigationService';
import {RootStack} from "./routes/routes";

// Durum ve Özellikler
