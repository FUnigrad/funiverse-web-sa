import { Cookies } from 'react-cookie';
export const CookieNames = {
  AccessToken: 'accessToken',
  RefreshToken: 'refreshToken',
} as const;
export interface DecodedToken {
  role: string;
  domain: string;
  username: string;
  sub: string;
  iat: number;
  exp: number;
}
export const appCookies = (function () {
  const cookies = new Cookies();
  return {
    getAccessToken: () => cookies.get(CookieNames.AccessToken),
    getRefreshToken: () => cookies.get(CookieNames.RefreshToken),
    getDecodedAccessToken: (): DecodedToken | null => {
      const token = cookies.get(CookieNames.AccessToken);
      try {
        return JSON.parse(atob(token.split('.')[1])) as DecodedToken;
      } catch (e) {
        return null;
      }
    },
    clearAll: () => {
      cookies.remove(CookieNames.AccessToken);
      cookies.remove(CookieNames.RefreshToken);
    },
  };
})();
