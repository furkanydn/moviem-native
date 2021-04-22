import {MovieID} from '../indexIE';

export type SocialActionType = 'skip' | 'watchlist' | 'favorite';

export interface SocialAction {
  id: string;
  movieID: MovieID;
  actionType: SocialActionType;
}
