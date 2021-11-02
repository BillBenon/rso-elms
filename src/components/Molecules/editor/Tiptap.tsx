import '../../../styles/components/Molecules/editor/tiptap.scss';

import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

import MenuBar from './Menubar';

interface IProps {
  handleChange: (_editor: Editor) => void;
  content: string;
  editable?: boolean;
  viewMenu?: boolean;
}

export default function Tiptap({
  handleChange,
  content,
  editable = true,
  viewMenu = true,
}: IProps) {
  const editor = useEditor({
    onUpdate({ editor }) {
      handleChange(editor as Editor);
    },
    extensions: [StarterKit],
    content,
    editable,
  });

  return (
    <section id="tiptap-editor">
      {viewMenu && (
        <article>
          <MenuBar editor={editor} />
        </article>
      )}
      <article>
        <EditorContent editor={editor} />
      </article>
    </section>
  );
}
