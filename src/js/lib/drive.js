import { clientId, scope } from './config';

let oauthToken = '';

class Drive {

  // Google認証のチェック
  checkOauth() {
    const authParams = {
        'client_id': clientId,
        'scope': scope,
        'immediate': true
    };
    let promise = new Promise((resolve, reject) => {
        window.gapi.load('auth', {
          'callback': () => {
            window.gapi.auth.authorize(authParams,(authResult) => {
              if (authResult && !authResult.error) {
                  // auth success.
                  oauthToken = authResult.access_token;
                  resolve();
              } else {
                  // auth failed.
                  reject();
              }
            });
          }
        });
    });
    return promise;
  }

  // Google認証
  authOauth() {
    const authParams = {
      'client_id': clientId,
      'scope': scope,
      'immediate': false
    }
    let promise = new Promise((resolve, reject) => {
        window.gapi.load('auth', {
          'callback': () => {
            window.gapi.auth.authorize(authParams,(authResult) => {
              if (authResult && !authResult.error) {
                  resolve(authResult.access_token);
              }
            });
          }
        });
    });
    return promise;
  }
}

const drive = new Drive();
export default drive;
