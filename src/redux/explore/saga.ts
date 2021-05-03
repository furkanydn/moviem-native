import {AxiosResponse} from 'axios';
import {random} from 'lodash';
import {call, delay, put, select, take} from 'redux-saga/effects';
//
import {getPopularMovieAPI, MovieListApiResponse} from '../../api/movies';
import {UserIDParams} from '../../api/type';
import {CardImage} from '../../components/index';
import {prefetchImage} from '../../utils/network';
import {userIDParamsSelect} from '../auth/selector';
import {changeMovieStatusRequest} from "../movies/action";
import {CHANGE_MOVIE_STATUS_FAILURE,CHANGE_MOVIE_STATUS_SUCCESS} from "../movies/constants";;
