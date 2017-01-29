import React, { Component, PropTypes } from 'react';
import { Popup, Button, Header, Image, Modal, Form } from 'semantic-ui-react';

import { Diff2Html } from 'diff2html';
import Drive from '../lib/drive';

export default class NewFileModal extends Component {

  render() {
    return (
      <div id='newfile'>
        <Modal size='small' open={ this.props.visible } onClose={ () => this.close() }>
          <Modal.Header>Create CodeReviewFile</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form name='newfile'>
                <Form.Field>
                  <label>File Name</label>
                  <input name='fileName' placeholder='File Name' />
                </Form.Field>
                <Form.TextArea name='diff' label='Diff' placeholder='' rows='8' />
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' content='Cancel' onClick={ () => this.close() } />
            <Button color='green' content='Create' onClick={ () => this.createFile() } />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  createFile() {
    const form = document.forms.newfile;
    const fileName = form.fileName.value;
    const strDiff = form.diff.value;

    const diff = Diff2Html.getPrettyHtml(strDiff, {
      inputFormat: 'diff',
      outputFormat: 'side-by-side', //TODO オプションで変更できるように
      //outputFormat: 'line-by-line', //TODO オプションで変更できるように
      showFiles: true,
    });

    Drive.createFile(fileName, diff).then(
      (id) => {
        this.props.onChangeOpenedFile(id);
        this.close();
      },
      (e) => {
        console.log(e);
      }
    );
  }

  close() {
    // ファイル生成中だったら閉じない
    this.props.onChangeVisible(false);
  }
}

NewFileModal.propTypes = {
  visible: PropTypes.bool,
  onChangeVisible: PropTypes.func,
  onChangeOpenedFile: PropTypes.func,
};
