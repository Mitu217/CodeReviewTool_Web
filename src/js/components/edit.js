import React, { Component, PropTypes } from 'react'
import { Diff2Html } from 'diff2html';
import Drive from '../lib/drive';

export default class Edit extends Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.openedFile !== nextProps.openedFile) {
      if(nextProps.openedFile) {
        // 開くファイルが変更されたらされたら新規読み込み
        Drive.loadRealtimeFile(nextProps.openedFile).then(
          (doc) => {
            let diff = doc.getModel().getRoot().get('diff');
            this.props.onChangeOutputDiff(diff);
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
        <div key='diff' dangerouslySetInnerHTML={{__html: this.props.outputDiff}}>
        </div>
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
  outputDiff: PropTypes.string,
  onChangeOutputDiff: PropTypes.func,
};
