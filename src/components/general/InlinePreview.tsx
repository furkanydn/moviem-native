import React from "react";
import {StyleSheet,View} from "react-native";
import FastImage from "react-native-fast-image";
import {NavigationInjectedProps,withNavigation} from "react-navigation";
import {connect} from "react-redux";
//
import {getSmallImageUrl} from '../../api/urlKEY';
import {MovieID,RootState,getMovieSelectByID} from "../../redux/indexIE";
import {routeName} from "../../routes/routeName";
import {MovieDet}
