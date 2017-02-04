import { Diff2Html } from 'diff2html';
import { Segment } from 'semantic-ui-react';

let diffJson = null;
let defaultTarget = 'body';
let currentSelectionColumnId = -1;
let commentBtn = null;

class Diff2HtmlUI {

  draw(targetId, config) {
    let cfg = config || {};
    cfg.inputFormat = 'json';

    if(cfg.diff) {
      diffJson = Diff2Html.getJsonFromDiff(cfg.diff);
    } else if(cfg.json){
      diffJson = cfg.json;
    }

    let $target = this._getTarget(targetId);
    $target.html(Diff2Html.getPrettyHtml(diffJson, cfg));

    if(cfg.synchronisedScroll) {
      this.synchronisedScroll($target, cfg);
    }
  }

  synchronisedScroll(targetId) {
    let $target = this._getTarget(targetId);
    $target.find('.d2h-file-side-diff').scroll(() => {
      const $this = $target.find('.d2h-file-side-diff');
      $this.closest('.d2h-file-wrapper').find('.d2h-file-side-diff')
        .scrollLeft($this.scrollLeft());
    });
  };

  fileListCloseable(targetId, startVisible) {
    const $target = this._getTarget(targetId);
    const hashTag = this._getHashTag();

    if (hashTag === 'files-summary-show') this.showFileList($target);
    else if (hashTag === 'files-summary-hide') this.hideFileList($target);
    else if (startVisible) this.showFileList($target);
    else this.hideFileList($target);

    let $showBtn = $target.find('.d2h-show');
    let $hideBtn = $target.find('.d2h-hide');
    $showBtn.click(() => { this.showFileList($target); });
    $hideBtn.click(() => { this.hideFileList($target); });
  };

  showFileList($target) {
    let $showBtn = $target.find('.d2h-show');
    let $hideBtn = $target.find('.d2h-hide');
    let $fileList = $target.find('.d2h-file-list');
    $showBtn.hide();
    $hideBtn.show();
    $fileList.show();
  }

  hideFileList($target) {
    console.log($target);
    let $showBtn = $target.find('.d2h-show');
    let $hideBtn = $target.find('.d2h-hide');
    let $fileList = $target.find('.d2h-file-list');
    $hideBtn.hide();
    $showBtn.show();
    $fileList.hide();
  }

  highlightCode(targetId) {
    const that = this;
    const $target = that._getTarget(targetId);

    // collect all the diff files and execute the highlight on their lines
    var $files = $target.find('.d2h-file-wrapper');
    $files.map(function(_i, file) {
      var oldLinesState;
      var newLinesState;
      var $file = $(file);
      var language = $file.data('lang');

      // collect all the code lines and execute the highlight on them
      var $codeLines = $file.find('.d2h-code-line-ctn');
      $codeLines.map(function(_j, line) {
        var $line = $(line);
        var text = line.textContent;
        var lineParent = line.parentNode;

        var lineState;
        if (lineParent.className.indexOf('d2h-del') !== -1) {
          lineState = oldLinesState;
        } else {
          lineState = newLinesState;
        }

        var result = hljs.getLanguage(language) ? hljs.highlight(language, text, true, lineState) : hljs.highlightAuto(text);

        if (lineParent.className.indexOf('d2h-del') !== -1) {
          oldLinesState = result.top;
        } else if (lineParent.className.indexOf('d2h-ins') !== -1) {
          newLinesState = result.top;
        } else {
          oldLinesState = result.top;
          newLinesState = result.top;
        }

        var originalStream = highlightJS.nodeStream(line);
        if (originalStream.length) {
          var resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
          resultNode.innerHTML = result.value;
          result.value = highlightJS.mergeStreams(originalStream, highlightJS.nodeStream(resultNode), text);
        }

        $line.addClass('hljs');
        $line.addClass(result.language);
        $line.html(result.value);
      });
    });
  };



  _getTarget(targetId) {
    let $target;

    if(typeof(targetId) === 'object' && targetId instanceof jQuery) {
      $target = targetId;
    } else if(typeof(targetId) === 'string') {
      $target = $(targetId);
    } else {
      console.error("Wrong target provided! Falling back to default value 'body'.");
      console.log('Please provide a jQuery object or a valid DOM query string.');
      $target = $(defaultTarget);
    }

    return $target
  }

  _getHashTag() {
    const docUrl = document.URL;
    const hashTagIndex = docUrl.indexOf('#');

    let hashTag = null;
    if (hashTagIndex !== -1) {
      hashTag = docUrl.substr(hashTagIndex + 1);
    }

    return hashTag;
  };

  addCommentBtnEvent(callback) {
    var pusher = $('.pusher');
    var that = this;

    $(".pusher *").unbind();

    //TODO あとでtrにクラスがついてから考える
    pusher.mouseover((event) => {
      let $target = $(event.target);
      let $line = $target.closest('tr');
      let $number = $line.find('.d2h-code-linenumber,.d2h-code-side-linenumber');

      if($number.length) {
        if($number.attr('class').match(/.d2h-del/)){
          this._showCommentBtn($number, callback);
        } else if($number.attr('class').match(/.d2h-ins/)){
          this._showCommentBtn($number, callback);
        } else if($number.attr('class').match(/.d2h-cntx/)) {
          //this._showCommentBtn($number, callback);
        }
      }
    });
    //TODO あとでtrにクラスがついてから考える
    pusher.mouseout((event) => {
      let $target = $(event.target);
      if($target.attr('class') && !$target.attr('class').match(/d2h-code-side-line/)){
        return;
      }

      let $line = $target.closest('tr');
      let $number = $line.find('.d2h-code-linenumber,.d2h-code-side-linenumber');

      if($number.length) {
        if($number.attr('class').match(/.d2h-del/)){
          this._hideCommentBtn($number);
        } else if($number.attr('class').match(/.d2h-ins/)){
          this._hideCommentBtn($number);
        } else if($number.attr('class').match(/.d2h-cntx/)) {
          //this._hideCommentBtn($number);
        }
      }
    });
  }

  //TODO あとでtrにクラスがついてから考える
  _showCommentBtn(target, callback) {
    let $btn = target.find('.d2h-code-comment-btn');
    if(!$btn.length) {
      this._hideCommentBtn();
      commentBtn = target.append("<div class='d2h-code-comment-btn'>+</div>");
      commentBtn.click((e) => {
        callback(e.target);
      })
    }
  }

  //TODO あとでtrにクラスがついてから考える
  _hideCommentBtn(target) {
    /*
    if(commentBtn) {
      commentBtn.unbind();
      commentBtn.remove;
      commentBtn = null;
    }
    if(target) {
      let $btn = target.find('.d2h-code-comment-btn');
      if($btn.length) {
        $btn.unbind();
        $btn.remove();
      }
    }
    */
  }

  editComment(target, config, postCallback, cancelCallback) {
    if(!target){
      return;
    }
    const cfg = config || {};

    // side-by-sideかline-by-lineかの判定
    if( cfg.outputFormat === 'side-by-side') {
      let tr = target.closest('tr');
      let rowIndex = tr.rowIndex;

      let tbody = $(target.closest('tbody'));
      let textArea = $(tbody.children()[rowIndex+1]).find('.d2h-comment-side-linenumber');
      if(textArea.length) { //block duplicated
        return;
      }

      //delかins,cntxかで判定できる疑惑ある
      let fileDiff = $(target.closest('.d2h-files-diff'));
      let sideDiff = $(target.closest('.d2h-file-side-diff'));
      let targetDiffIndex = fileDiff.children().index(sideDiff);
      let anotherDiff = targetDiffIndex == 0 ? fileDiff.children()[1] : fileDiff.children()[0];

      // add comment form
      $(tr).after('<tr><td class="d2h-comment-side-linenumber"></td><td><div class="d2h-side-edit-comment"><div class="ui clearing segment"><form class="ui form"><textarea name="comment" rows="4"></textarea></form><button class="ui green right floated button">Reply</button><button class="ui black right floated button">Cancel</button></div></div></td></tr>');
      let postBtn = $(tbody.children()[rowIndex+1]).find('.green');
      let cancelBtn = $(tbody.children()[rowIndex+1]).find('.black');
      postBtn.click((e) => { postCallback('テストコメント'); });
      cancelBtn.click((e) => { cancelCallback || cancelCallback(); });

      // add dummy form heigit
      let anotherTbody = $(anotherDiff).find('.d2h-diff-tbody');
      $(anotherTbody.children()[rowIndex]).after('<tr><td class="d2h-comment-side-linenumber"></td><td><div class="d2h-side-edit-dummy"></div></td></tr>');
    } else {

    }
  }

  cancelComment(target) {

  }

}

const diff2htmlUI = new Diff2HtmlUI();
export default diff2htmlUI;
