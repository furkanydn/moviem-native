import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
//
import {MovieAPIDetailed} from '../../api/type';
import {getIMDB_Url} from '../../api/urlKEY';
import {Favorite,Watchlist, MovieI} from '../../icons';
import {changeMovieStatusRequest,Movie} from "../../redux/indexIE";
import {THEME} from "../../utils/theme";
import {safeURLOpen} from "../../utils/network";
import AuthLock from "../general/AuthLock";
// import iconbutton
