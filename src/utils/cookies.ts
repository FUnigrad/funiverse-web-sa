import { Cookies } from 'react-cookie';
import { __DEV__ } from '.';
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
      const defaultOption = { domain: __DEV__ ? 'localhost' : process.env.REACT_APP_PUBLIC_DOMAIN };
      cookies.remove(CookieNames.AccessToken, defaultOption);
      cookies.remove(CookieNames.RefreshToken, defaultOption);
      document.cookie = `${CookieNames.AccessToken}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=funiverse.world; path=/;`;
      document.cookie = `${CookieNames.RefreshToken}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=funiverse.world; path=/;`;
      document.cookie = `isWorkspaceActive=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=funiverse.world; path=/;`;
    },
  };
})();
