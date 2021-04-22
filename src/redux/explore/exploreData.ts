import {SwipeDirect} from '../../components';
import {SocialAction} from './type';

//https://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type
export const socialActMap: Record<SwipeDirect, SocialAction> = {
  left: 'skip' as any,
  right: 'watchlist' as any,
  top: 'favorite' as any,
};
