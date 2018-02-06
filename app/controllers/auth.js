import * as config from './config';
import * as utils from './utils';

export function getForm() {
  return new Promise((resolve, reject) => {
    fetch(config.getUrl(config.route.auth.getform), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => {
      utils.processResponse(response, resolve, reject);
    })
    .catch((error) => {
      utils.processResponse(error, resolve, reject);
    });
  });
}

export function login(formData) {
  return new Promise((resolve, reject) => {
    let formDataStr = JSON.stringify(formData);

     fetch(config.getUrl(config.route.auth.login), {
         method: 'POST',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: formDataStr
     })
     .then(response => {
        utils.processResponse(response, resolve, reject);
     })
     .catch(error => {
        utils.processResponse(error, resolve, reject);
     });
 });
}