import '../../../styles/components/Molecules/editor/menubar.scss';

import { Editor } from '@tiptap/react';
import React from 'react';

import Icon from '../../Atoms/custom/Icon';

interface IProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: IProps) {
  if (!editor) {
    return null;
  }

  return (
    <div id="editor-menubar" className="mt-2 mb-3">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <Icon name="bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
        <Icon name="text-italic" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}>
        <Icon name="text-strikethrough" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}>
        <Icon name="code" />
      </button>
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}>
        <Icon name="paragraph" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
        <Icon name="heading" />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
        h2
        </button> */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
        <Icon name="heading" />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
        h4
        </button> */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}>
        <Icon name="heading" />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>
        h6
      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}>
        <Icon name="list-ul" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}>
        <Icon name="list-ol" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}>
        <Icon name="code" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}>
        <Icon name="blockquote-left" />
      </button>
      {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
        <Icon name="blockquote-left" />
      </button> */}
      {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button> */}

      <button onClick={() => editor.chain().focus().undo().run()}>
        <Icon name="undo" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <Icon name="redo" />
      </button>
    </div>
  );
}
