// Sabit Bileşenleri İçeri Aktarma
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationStackScreenProps} from '@react-navigation/stack';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

// Yazılan Bileşenleri İçeri Aktarma
import {REGISTRATION_URL} from '../../api/urlKEY';
import {TextView, TextButton, PriButton, SecButton,Spinner} from '../../components';
