import React, { Component, PropTypes } from 'react'
import { Segment, Form, TextArea, Button } from 'semantic-ui-react';
import { Diff2Html } from 'diff2html';
import Drive from '../lib/drive';
import Diff2HtmlUI from '../lib/diff2html-ui';

let diff,comments;

export default class Edit extends Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.openedFile !== nextProps.openedFile) {
      if(nextProps.openedFile) {
        // 開くファイルが変更されたらされたら新規読み込み
        Drive.loadRealtimeFile(nextProps.openedFile).then(
          (doc) => {
            diff = doc.getModel().getRoot().get('diff');
            comments = doc.getModel().getRoot().get('comments');
            this.props.onChangeOutputDiff(diff);
            this.props.onChangeOutputComments(comments);
          },
          () => {}
        );
      }
    }
  }

  render() {
    let output = [];

    const rawDiff = this.props.outputDiff;
    const rawJson = Diff2Html.getJsonFromDiff(rawDiff, {
      inputFormat: 'diff',
      outputFormat: 'side-by-side', //TODO オプションで変更できるように
      //outputFormat: 'line-by-line', //TODO オプションで変更できるように
      showFiles: true,
    });

    const rawComments = this.props.outputComments;
    const comments = rawComments.split(',');
    //NOTE: コメント仕様
    // (id):(fileIndex):(blockIndex):(lineIndex):(user):(コメント):(datetime),

    // load comments
    let outputComments = comments.map((comment) => {
      return comment.split(':');
    })

    //
    const json = rawJson.map((json, fileIndex) => {
        json.blocks.map((block, blockIndex) => {
          //該当コメントが存在すればデータを挿入していく

          return block;
        });
        return json;
    });

      /*
      var diff2htmlUi = new Diff2HtmlUI({json: json});
    if (outputFormat === 'side-by-side') {
      $container.css({'width': '100%'});
    } else {
      $container.css({'width': ''});
    }

    */
    if(this.props.openedFile) {
      Diff2HtmlUI.draw('#edit', {
        json: json,
        outputFormat: 'side-by-side',
        showFiles: true,
      });
      Diff2HtmlUI.fileListCloseable('#edit', true);
      Diff2HtmlUI.addCommentBtnEvent((target) => {
        //TODO  編集状態の登録 - 編集中の状態をrelatimeデータに追加（どのファイルのどの行かぐらいしかとれないかな？
        Diff2HtmlUI.editComment(target, {
          outputFormat: 'side-by-side'
        },
        (comment) => {
          console.log(comment);
          Diff2HtmlUI.cancelComment(target);
        },
        () => {
          Diff2HtmlUI.cancelComment(target);
        });
      })
      Diff2HtmlUI.synchronisedScroll('#edit', true);
      //Diff2HtmlUI.highlightCode('#edit');
    }
/*
    const html = Diff2Html.getPrettySideBySideHtmlFromJson(json, {
      showFiles: true,
    });
*/
    // drive realtime connection
    /*
      var textArea1 = document.getElementById('text_area_1');
      var textArea2 = document.getElementById('text_area_2');
      gapi.drive.realtime.databinding.bindString(diff, textArea1);
      gapi.drive.realtime.databinding.bindString(comments, textArea2);
    */

/*
    if(this.props.openedFile) {
      output.push(
        <div key='diff' dangerouslySetInnerHTML={{__html: html}}>
        </div>
      );
    }
*/

    return (
      <div id='edit'></div>
    );
  }

}

Edit.propTypes = {
  openedFile: PropTypes.string,
  outputDiff: PropTypes.string,
  outputComments: PropTypes.string,
  onChangeOutputDiff: PropTypes.func,
  onChangeOutputComments: PropTypes.func,
};
