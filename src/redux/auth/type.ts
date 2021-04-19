// Kullanıcı Bazlı Bileşenler
interface BaseUSER {
  guest: boolean;
  sessionID: string;
}
interface AuthUSERParams {
  accountID: number;
  name: string;
  username: string;
  includeADULT: boolean;
}
export interface GuestUSER extends BaseUSER {
  guest: true;
}
export interface AuthUSER extends BaseUSER, AuthUSERParams {
  guest: false;
}

export type USER = GuestUSER | AuthUSER;
