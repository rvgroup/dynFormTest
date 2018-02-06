import { SERVER_URL } from '../../appconfig';

export const route = {
  auth: {
    getform: '/forms/post/user/authentication',
    login: '/user/authentication'
  },
  profile: {
    get: '/profile/get'
  }
};

export function getUrl(localPath) {
  return SERVER_URL + localPath;
}
