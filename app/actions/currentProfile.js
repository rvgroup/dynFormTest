import * as controllers from '../controllers';

export function login(formData, callback, errorCallback) {
  return (dispatch) => {
      controllers.auth.login(formData)
      .then(resp => {
          // Успешный вход
          if (callback) {
              callback(resp);
          }
      })
      .catch((error) => {
          // Ошибка входа
          if (errorCallback) {
              errorCallback(error);
          }
      });
  };
}

export function getForm(callback, errorCallback) {
    return (dispatch) => {
        controllers.auth.getForm()
        .then(formData => {
            // Успешный вход
            if (callback) {
                callback(formData);
            }
        })
        .catch((error) => {
            // Ошибка входа
            if (errorCallback) {
                errorCallback(error);
            }
        });
    };
}
