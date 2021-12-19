import { useEffect } from 'react';

export interface MarkdownEditorWrapperProps {
  id?: string;
  width?: string;
  height?: number;
  path: string;
  theme?: 'light' | 'dark';
  previewTheme?: 'light' | 'dark';
  editorTheme?: 'pastel-on-dark';
  markdown: string;
  codeFold?: boolean;
  syncScrolling?: boolean;
  saveHTMLToTextarea?: boolean;
  searchReplace?: boolean;
  watch?: boolean;
  htmlDecode?: string;
  toolbar?: boolean;
  previewCodeHighlight?: boolean;
  emoji?: boolean;
  taskList?: boolean;
  tocm?: boolean;
  tex?: boolean;
  flowChart?: boolean;
  sequenceDiagram?: boolean;
  dialogLockScreen?: boolean;
  dialogShowMask?: boolean;
  dialogDraggable?: boolean;
  dialogMaskOpacity?: number;
  dialogMaskBgColor?: string;
  imageUpload?: boolean;
  imageFormats?: string[];
  imageUploadURL: string;
  onload?: (editor: unknown, e: unknown) => void;
}

const defaultConfig = {
  id: `editormd-${new Date().getTime()}`,
  width: '100%',
  height: 740,
  theme: 'light',
  previewTheme: 'light',
  editorTheme: 'pastel-on-dark',
  path: '/',
  codeFold: true,
  syncScrolling: false,
  saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
  searchReplace: true,
  watch: true,                // 实时预览
  htmlDecode: 'style,script,iframe|on*',            // 开启 HTML 标签解析，为了安全性，默认不开启
  toolbar: true,             //关闭工具栏
  previewCodeHighlight: true, // 关闭预览 HTML 的代码块高亮，默认开启
  emoji: true,
  taskList: true,
  tocm: true,                  // Using [TOCM]
  tex: true,                   // 开启科学公式TeX语言支持，默认关闭
  flowChart: true,             // 开启流程图支持，默认关闭
  sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
  dialogLockScreen: true,     // 设置弹出层对话框不锁屏，全局通用，默认为true
  dialogShowMask: true,       // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
  dialogDraggable: true,      // 设置弹出层对话框不可拖动，全局通用，默认为true
  dialogMaskOpacity: 0.4,     // 设置透明遮罩层的透明度，全局通用，默认值为0.1
  dialogMaskBgColor: '#000',  // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
  imageUpload: true,
  imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
  onload: () => {}
};

const MarkdownWrapper = ( props: MarkdownEditorWrapperProps) => {
  const mdconfig: MarkdownEditorWrapperProps = Object.assign({}, defaultConfig, props);

  useEffect(() => {
    const {
      width, height, path, theme, previewTheme, editorTheme, markdown, codeFold, syncScrolling,
      saveHTMLToTextarea, searchReplace, watch, htmlDecode, toolbar, previewCodeHighlight, emoji,
      taskList, tocm, tex, flowChart, sequenceDiagram, dialogLockScreen, dialogShowMask, dialogDraggable,
      dialogMaskOpacity, dialogMaskBgColor, imageUpload, imageFormats, imageUploadURL, onload
    } = mdconfig;

    // @ts-ignore
    const editor = editormd(mdconfig.id, {
      width: width,
      height: height,
      path: path,
      theme: theme,
      previewTheme: previewTheme,
      editorTheme: editorTheme,
      markdown: markdown,
      codeFold: codeFold,
      syncScrolling: syncScrolling,
      saveHTMLToTextarea: saveHTMLToTextarea,    // 保存 HTML 到 Textarea
      searchReplace: searchReplace,
      watch: watch,                // 关闭实时预览
      htmlDecode: htmlDecode,            // 开启 HTML 标签解析，为了安全性，默认不开启
      toolbar: toolbar,             //关闭工具栏
      previewCodeHighlight: previewCodeHighlight, // 关闭预览 HTML 的代码块高亮，默认开启
      emoji: emoji,
      taskList: taskList,
      tocm: tocm,         // Using [TOCM]
      tex: tex,                   // 开启科学公式TeX语言支持，默认关闭
      flowChart: flowChart,             // 开启流程图支持，默认关闭
      sequenceDiagram: sequenceDiagram,       // 开启时序/序列图支持，默认关闭,
      dialogLockScreen: dialogLockScreen,   // 设置弹出层对话框不锁屏，全局通用，默认为true
      dialogShowMask: dialogShowMask,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
      dialogDraggable: dialogDraggable,    // 设置弹出层对话框不可拖动，全局通用，默认为true
      dialogMaskOpacity: dialogMaskOpacity,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
      dialogMaskBgColor: dialogMaskBgColor, // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
      imageUpload: imageUpload,
      imageFormats: imageFormats,
      imageUploadURL: imageUploadURL,
      onload: () => {
        if (onload) {
          onload(editor, this);
        }
      }
    });
  },[])
  return (<div id={mdconfig.id} />);
};

export default MarkdownWrapper;
