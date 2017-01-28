import { clientId, scope } from './config';

let oauthToken,client;

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
      var promise = new Promise(function (resolve, reject) {
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
    console.log(strParentId);
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
    var promise = new Promise(function (resolve, reject) {
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
}

const drive = new Drive();
export default drive;
