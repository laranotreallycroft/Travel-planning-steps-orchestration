import axios from 'axios';
import AuthTokenManager from 'service/util/AuthTokenManager';

// Utility to get the token
const getAuthHeaders = () => {
  const token = AuthTokenManager.getToken();
  return { Authorization: `Bearer ${token}` };
};

export default class EntityApiService {
  static postEntity<T>(url: string, payload: T) {
    return axios.post(url, payload, { headers: getAuthHeaders() });
  }

  static getEntity<T>(url: string, payload?: T) {
    return axios.get(url, { params: payload, headers: getAuthHeaders() });
  }

  static putEntity<T>(url: string, payload: T) {
    return axios.put(url, payload, { headers: getAuthHeaders() });
  }

  static deleteEntity<T>(url: string, payload?: T) {
    return axios.post(url, { data: payload, headers: getAuthHeaders() });
  }
}
