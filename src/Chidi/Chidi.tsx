import { css, cx } from '@emotion/css';

import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';

import { useEffect, useState } from 'react';

import { placeholderText } from '../theme';

import { MainToolbar } from './MainToolbar';
import { ContextMenu, MainMenu } from './Menu';

import { Title } from './Title';

export interface ChidiProps {

}

const rootStyle = css`
  position: relative;
  display: flex;
  margin: auto;
  max-width: 720px;
  padding-top: 3rem;

  /* Should be external */
  min-height: 100vh;

  /* Dark shade: #626975 or #514740 */
  color: #514740;

  .ProseMirror {
    outline: 0;
    font-size: 1.25rem;

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      height: 0;
      float: left;

      pointer-events: none;
      color: ${placeholderText};
    }
  }
`;

const toolbarStyle = css`
  position: sticky;
  margin-right: 0.5rem;
  padding-bottom: 8vh;
  bottom: 0vh;

  align-self: flex-end;

  border-right: 1px solid rgba(193, 182, 172, 0.5);

  @media (min-height: 992px) {
    padding-bottom: 16vh;
  }
`;

const writerStyle = css`
  padding: 1rem;
  flex-grow: 1;
`;


export function Chidi(props: ChidiProps) {

  const [title, setTitle] = useState('Sample title of the Post');

  const editor = useEditor({
    extensions: [
      Document,
      Blockquote,
      Bold,
      BulletList,
      Code,
      CodeBlockLowlight,
      Dropcursor,
      Gapcursor,
      HardBreak,
      Heading.configure({ levels: [2, 3] }),
      History,
      HorizontalRule,
      Italic,
      ListItem,
      OrderedList,
      Paragraph,
      Placeholder,
      Strike,
      Text,
      Underline
    ],
    content: '<p>Hello World! 🌎️</p>'
  });


  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const onCommit = () => {
    editor?.commands.focus('start');
  };

  return (
    <div className={cx('chidi', rootStyle)}>

      {editor && <MainToolbar className={toolbarStyle} editor={editor} />}

      <div className={writerStyle}>
        <Title value={title} onChange={setTitle} onCommit={onCommit} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
