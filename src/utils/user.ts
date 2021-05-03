import {GetAccountDetailsApiResponse} from '../api/auth';
import {AuthUSER} from '../redux/auth/type';

export const createAuthUserAccountData = (
  data: GetAccountDetailsApiResponse,
  sessionID: string,
): AuthUSER => ({
  sessionID,
  guest: false,
  accountID: data.id,
  name: data.name,
  username: data.username,
  includeADULT: data.include_adult,
});
