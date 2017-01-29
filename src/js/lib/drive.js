import { clientId, scope } from './config';

let oauthToken,client, realtimeUtils;
class Drive {

  // check authorized google
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
                resolve();
              } else {
                reject();
              }
            });
          }
        });
    });
    return promise;
  }

  checkRealtimeOauth() {
    realtimeUtils = new window.utils.RealtimeUtils({ clientId: clientId });
    let promise = new Promise((resolve, reject) => {
      realtimeUtils.authorize(function(response){
        if(response.error){
          reject();
        } else {
          resolve();
        }
      }, false);
    });
    return promise;
  }

  // authorize google
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
                  resolve();
              }
            });
          }
        });
    });
    return promise;
  }

  // load google drive client
  loadGoogleDrive() {
      let promise = new Promise(function (resolve, reject) {
          try {
              window.gapi.client.load('drive', 'v3', () => {
                client = window.gapi.client;
                resolve();
              });
          } catch (e) {
              reject(e);
          }

          function fncOnDriveApiLoad() {

          }
      });
      return promise;
  }

  // get drive file list
  getFileList(strParentId) {
    var params = {
      orderBy: 'folder',
      q: 'trashed=false',
      fields: 'files(id, name, kind, size, mimeType, lastModifyingUser, modifiedTime, iconLink, owners, folderColorRgb, shared, webViewLink, webContentLink), nextPageToken'
    };
    if (strParentId) {
      params.q += ' and ' + '"' + strParentId + '" in parents';
    } else {
      // TODO localstorageに記録がないか取得する
      params.q += ' and "root" in parents';
    }
    let promise = new Promise(function (resolve, reject) {
      try {
        var req = client.drive.files.list(params);
        req.execute((res) => {
            resolve(res);
        });
      } catch (e) {
        reject(e);
      }
    });
    return promise;
  }

  /** create file for reatime editing **/
  createFile(name, diff) {
    const self = this;
    console.log(name);
    let promise = new Promise((resolve, reject) => {
      try {
        realtimeUtils.createRealtimeFile('New Quickstart File', (createResponse) => {
          realtimeUtils.load(
            createResponse.id,
            (doc) => {
              resolve(createResponse.id);
            },
            (model) => {
              model.getRoot().set('diff', diff);      //diff-html model
              model.getRoot().set('comments', '');   //comment model
              model.getRoot().set('editingUser', '');  //editing-user model
              model.getRoot().set('connectUser', '');   //connection-user model
            }
          );
        });
      } catch (e) {
        reject(e);
      }
    });
    return promise;
  }

  /** create file for reatime editing **/
  loadRealtimeFile(id) {
    let promise = new Promise(function (resolve, reject) {
      try {
        realtimeUtils.load(id, resolve, null);
      } catch (e) {
        reject(e);
      }
    });
    return promise;
  }
}

const drive = new Drive();
export default drive;
