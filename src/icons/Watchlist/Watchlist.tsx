import * as React from 'react';
import WatchlistAdd from './WatchlistAdd';
import WatchlistCheck from './WatchlistCheck';

export const Watchlist = ({isInWatchList}: {isInWatchList: boolean}) =>
  isInWatchList ? <WatchlistCheck /> : <WatchlistAdd />;
