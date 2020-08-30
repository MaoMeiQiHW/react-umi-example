import qs from 'qs';
import axios from 'axios';

export default class Http {
  static get(url, data, timeout) {
    return new Promise((resolve, reject) => {
      axios
        .get(url + '?' + qs.stringify(data), {
          timeout: timeout ? timeout : 30000,
          headers: {
            authorization: sessionStorage.getItem('token'),
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
          // history.push('/');
        });
    });
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          timeout: 30000,
        })
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static postForm(url, data, timeout) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(data), {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            authorization: sessionStorage.getItem('token'),
          },
          timeout: timeout ? timeout : 30000,
        })
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
          // history.push('/');
        });
    });
  }

  static uploadFile(url, data, timeout) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: sessionStorage.getItem('token'),
          },
          timeout: timeout ? timeout : 30000,
        })
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
