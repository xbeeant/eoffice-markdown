import type { MarkdownEditorWrapperProps } from '@/component/markdown/wrapper';
import MarkdownWrapper from '@/component/markdown/wrapper';
import defaultSettings from '../../../config/defaultSettings';

export interface MarkdownEditorProps {
  value: string;
  mode: 'view' | 'edit';
  rid: string;
  imageUploadURL: string;
  onSave: (value: string) => void;
}

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const { value, mode, onSave, rid } = props;
  const host = window.location.host;
  const protocol = window.location.protocol;

  const config: MarkdownEditorWrapperProps = {
    imageUpload: true,
    imageUploadURL: './api/resource/attachment?rid=' + rid,
    path: `${protocol}//${host}${defaultSettings.basepath}/`,
    markdown: value,
    onEditorload: (editor) => {
      const keyMap = {
        'Ctrl-S': function (cm: { getValue: () => string }) {
          onSave(cm.getValue());
        },
      };

      // @ts-ignore
      editor.addKeyMap(keyMap);
    },
    toolbarIcons: () => {
      return [
        'undo',
        'redo',
        '|',
        'bold',
        'del',
        'italic',
        'quote',
        'ucwords',
        'uppercase',
        'lowercase',
        '|',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        '|',
        'list-ul',
        'list-ol',
        'hr',
        '|',
        'link',
        'reference-link',
        'image',
        'code',
        'preformatted-text',
        'code-block',
        'table',
        'datetime',
        'html-entities',
        'pagebreak',
        '|',
        'goto-line',
        'watch',
        'preview',
        'fullscreen',
        'clear',
        'search',
        'save',
        '|',
        'help',
      ];
    },
    toolbarIconsClass: {
      save: 'fa-save',
    },
    toolbarHandlers: {
      /**
       * @param {Object}      cm         CodeMirror对象
       */
      save: function (cm: { getValue: () => string }) {
        onSave(cm.getValue());
      },
    },
  };
  if ('edit' !== mode) {
    config.toolbar = false;
  }
  return <MarkdownWrapper {...config} />;
};

export default MarkdownEditor;
