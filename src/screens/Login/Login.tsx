// Sabit Bileşenleri İçeri Aktarma
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {connect} from 'react-redux';

// Yazılan Bileşenleri İçeri Aktarma
import {
  Spinner,
  PriButton,
  TextButton,
  LoginInput,
  Wrapper,
} from '../../components';
import {createAuthSessionRequest} from '../../redux/auth/action';
import {
  createAuthSessionPendingSelect,
  createAuthSessionErrorSelect,
  userSelect,
} from '../../redux/auth/selector';
import {RootState} from '../../redux/type';
import {THEME} from '../../utils/theme';
import {safeURLOpen} from "../../utils/network";
import
