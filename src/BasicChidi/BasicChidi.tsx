import { css, cx } from '@emotion/css';

import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';

import { useEffect, useState } from 'react';

import { placeholderText } from '../theme';

import { BasicContextMenu } from './BasicToolbar';


export interface BasicChidiProps {
  placeholder?: string
}

const rootStyle = css`
  position: relative;

  /* Dark shade: #626975 or #514740 */
  color: #514740;

  .ProseMirror {
    font-size: 0.875rem;
  }
`;

const toolbarStyle = css`
`;


export function BasicChidi(props: BasicChidiProps) {

  const { placeholder } = props;

  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'paragraph'
      }),
      Bold,
      History,
      Italic,
      Paragraph,
      Placeholder.configure({ placeholder }),
      Text
    ],
    content: ''
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
    <div className={cx('basic-chidi', rootStyle)}>

      {editor && <BasicContextMenu className={toolbarStyle} editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}