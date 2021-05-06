import {createSelector} from 'reselect';
import {UserIDParams} from '../../api/type';
import {RootState} from '../type';
import {AuthUSER, GuestUSER} from './type';

// Bileşenler
export const authStateSelect = (state: RootState) => state.auth;

export const userSelect = createSelector(authStateSelect, auth => auth.user);

export const isAuthUserSelect = createSelector(
  userSelect,
  user => !!user && !user.guest,
);

export const isGuestUserSelect = createSelector(
  isAuthUserSelect,
  isAuthUser => !isAuthUser,
);

export const usernameSelect = createSelector(
  [userSelect, isGuestUserSelect],
  (user, isGuestUser) => (isGuestUser ? 'guest' : (user as AuthUSER).username),
);

export const authUserSelect = createSelector(
  [userSelect, isAuthUserSelect],
  (user, isAuthUser) => (isAuthUser ? (user as AuthUSER) : undefined),
);

export const guestUserSelect = createSelector(
  isGuestUserSelect,
  userSelect,
  (isGuest, user) => (isGuest ? (user as GuestUSER) : undefined),
);

export const sessionIDSelect = createSelector(userSelect, user =>
  user ? user.sessionID : '',
);

export const accountIDSelect = createSelector(authUserSelect, user =>
  user ? user.accountID : 0,
);

export const userIDParamsSelect = createSelector(
  [sessionIDSelect, accountIDSelect],
  (sessionID, accountID): UserIDParams => ({
    sessionId: sessionID,
    accountId: accountID,
  }),
);

//
export const createAuthSessionPendingSelect = createSelector(
  authStateSelect,
  auth => auth.requests.createAuthSessionPending,
);

export const createAuthSessionErrorSelect = createSelector(
  authStateSelect,
  auth => auth.requests.createAuthSessionError,
);

export const createGuestSessionPendingSelect = createSelector(
  authStateSelect,
  auth => auth.requests.createGuestSessionPending,
);

export const createGuestSessionErrorSelect = createSelector(
  authStateSelect,
  auth => auth.requests.createGuestSessionError,
);
