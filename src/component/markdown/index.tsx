import MarkdownWrapper, { MarkdownEditorWrapperProps } from '@/component/markdown/wrapper';

export interface PermissionProps {
  copy: boolean;
  print: boolean;
  download: boolean;
  edit: boolean;
}

export interface MarkdownEditorProps {
  value: string;
  mode: 'view' | 'edit',
}


const MarkdownEditor = (props: MarkdownEditorProps) => {
  const { value, mode } = props;
  const config: MarkdownEditorWrapperProps = {
    imageUploadURL: '',
    path: '//localhost:8002/e-markdown/',
    markdown: value,
    onload: (editor, func) => {
      // @ts-ignore
      let md = editor.getMarkdown();
      console.log(md);
      // @ts-ignore
      let html = editor.getHTML();
      console.log(html);
    },
  };
  if ('edit' === mode) {
    return (
      <MarkdownWrapper {...config} />
    );
  }
  return (
    <div>show mode</div>
  );
};

export default MarkdownEditor;
