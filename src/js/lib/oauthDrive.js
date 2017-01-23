//import gapi from 'googleapis';
//import fs from 'fs';

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
const CLIENT_ID = '629393106275-qtgu7nefmb0uklfo7i6klm73u7g91b63.apps.googleusercontent.com';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const realtimeUtils = new utils.RealtimeUtils({ clientId: '629393106275-qtgu7nefmb0uklfo7i6klm73u7g91b63.apps.googleusercontent.com' });

class OauthDrive {
  /**
  * Check if current user has authorized this application.
  */
  checkAuth() {
    realtimeUtils.authorize(function(response){
/*
          if(response.error){
            // Authorization failed because this is the first time the user has used your application,
            // show the authorize button to prompt them to authorize manually.
            var button = document.getElementById('auth_button');
            button.classList.add('visible');
            button.addEventListener('click', function () {
              realtimeUtils.authorize(function(response){
                start();
              }, true);
            });
          } else {
              start();
          }*/
        }, false);
  }

  handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      loadDriveApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  }

  handleAuthClick(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult);
      return false;
  }

  loadDriveApi() {
    gapi.client.load('drive', 'v2', listFiles);
  }

  listFiles() {
    var request = gapi.client.drive.files.list({
      'maxResults': 10
    });

    request.execute(function(resp) {
      appendPre('Files:');
      var files = resp.items;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          appendPre(file.title + ' (' + file.id + ')');
        }
      } else {
        appendPre('No files found.');
      }
    });
  }

  appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

}

const oauthDrive = new OauthDrive();
export default oauthDrive;
