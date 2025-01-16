import axios from 'axios';
import { LoginBusinessStore } from 'service/business/login/LoginBusinessStore';
import { getStore } from 'service/business/RootBusinessStore';
import AuthTokenManager from 'service/util/AuthTokenManager';

// Utility to get the token
const getAuthHeaders = () => {
  const token = AuthTokenManager.getToken();
  return { Authorization: `Bearer ${token}` };
};

export default class EntityApiService {
  static postEntity<T>(url: string, payload: T) {
    return axios.post(url, payload, { headers: getAuthHeaders() }).catch(handleUnauthorizedError);
  }

  static getEntity<T>(url: string, payload?: T) {
    return axios.get(url, { params: payload, headers: getAuthHeaders() }).catch(handleUnauthorizedError);
  }
  static putEntity<T>(url: string, payload: T) {
    return axios.put(url, payload, { headers: getAuthHeaders() }).catch(handleUnauthorizedError);
  }

  static deleteEntity<T>(url: string, payload?: T) {
    return axios.delete(url, { data: payload, headers: getAuthHeaders() }).catch(handleUnauthorizedError);
  }
}

// Utility function to handle 403 errors and dispatch logout action
function handleUnauthorizedError(error: any) {
  if (error.response && error.response.status === 403) {
    console.log('Unauthorized Access (403)');
    getStore().dispatch(LoginBusinessStore.actions.logout()); // Dispatch logout action

    // Reject the promise with a custom error message
    return Promise.reject('Unauthorized Access (403)');
  } else {
    // Propagate other errors if they are not 403
    return Promise.reject(error);
  }
}
