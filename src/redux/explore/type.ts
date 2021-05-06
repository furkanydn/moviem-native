import {MovieID} from '../indexIE';

export type SocialActionType = 'skip' | 'favorite' | 'watchlist';

export interface SocialAction {
  id: string;
  movieID: MovieID;
  actionType: SocialActionType;
}
