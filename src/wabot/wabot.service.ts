import { Injectable } from '@nestjs/common';
import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';

@Injectable()
export class WabotService {
  constructor() {}

  async sendOTP(nohp: string, otp: string): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json',
      } as RawAxiosRequestHeaders,
    };

    try {
      const data = {
        userkey: process.env.Z_USERKEY,
        passkey: process.env.Z_APIKEY,
        to: nohp,
        brand: 'P4 GKP Bekasi',
        otp: otp,
      };
      const response: AxiosResponse = await axios.post(
        process.env.Z_URL,
        data,
        config,
      );
      console.log(response.status);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
}
