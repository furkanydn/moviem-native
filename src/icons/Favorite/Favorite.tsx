import * as React from 'react';
import FavoriteFull from './FavoriteFull';
import FavoriteEmpty from './FavoriteEmpty';

export const Favorite = ({isInFavorite}: {isInFavorite: boolean}) =>
  isInFavorite ? <FavoriteFull /> : <FavoriteEmpty />;
