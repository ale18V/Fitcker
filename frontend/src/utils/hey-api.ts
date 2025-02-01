import { API_URL } from '$/constants';
import user from '$/stores/user';
import type { CreateClientConfig } from '@hey-api/client-fetch';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: API_URL,
  auth: () => {
    return user.getState().authToken;
  }
});