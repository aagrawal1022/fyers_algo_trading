import { Injectable } from '@nestjs/common';
import { Credentials } from 'src/dto/credentials.dto';
import * as fyers from 'fyers-api-v2';

@Injectable()
export class AuthService {
  async generateUrl(appId: string) {
    const redirectUrl =
      'https://trade.fyers.in/api-login/redirect-uri/index.html';
    const aPI = 'https://api.fyers.in/api/v2/';
    const state = Math.round(Math.random() * 10000000000);
    return `${aPI}generate-authcode?client_id=${appId}&redirect_uri=${redirectUrl}&response_type=code&state=${state}`;
  }

  async generateToken(credentials: Credentials) {
    const reqBody = {
      client_id: credentials.appId,
      secret_key: credentials.secretKey,
      auth_code: credentials.authCode,
    };
    return fyers.generate_access_token(reqBody);
  }

  async getProfile(credentials: Credentials) {
    fyers.setAppId(credentials.appId);
    fyers.setAccessToken(credentials.accessToken);
    return fyers.get_profile();
  }
  async getFunds(credentials: Credentials) {
    fyers.setAppId(credentials.appId);
    fyers.setAccessToken(credentials.accessToken);
    return fyers.get_funds();
  }
  async getHoldings(credentials: Credentials) {
    fyers.setAppId(credentials.appId);
    fyers.setAccessToken(credentials.accessToken);
    return fyers.get_holdings();
  }
}
