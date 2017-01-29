import React, { Component, PropTypes } from 'react'
import { Diff2Html } from 'diff2html';
import Drive from '../lib/drive';

export default class Edit extends Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.openedFile !== nextProps) {
      if(nextProps.openedFile) {
        // 開くファイルが変更されたらされたら新規読み込み
        Drive.loadRealtimeFile(nextProps.openedFile).then(
          (doc) => {
            var collaborativeString = doc.getModel().getRoot().get('diff');

            var textArea1 = document.getElementById('text_area_1');
            window.gapi.drive.realtime.databinding.bindString(collaborativeString, textArea1);

            console.log(collaborativeString);
          },
          () => {}
        );
      }
    }
  }

  render() {
    let output = [];
    if(this.props.openedFile) {
      output.push(
        <textarea id="text_area_1"></textarea>
      );
    }

    return (
      <div id='edit'>
        { output }
      </div>
    );
  }

}

Edit.propTypes = {
  openedFile: PropTypes.string,
};
