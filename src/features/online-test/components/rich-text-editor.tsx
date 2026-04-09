"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  FiBold,
  FiChevronDown,
  FiItalic,
  FiList,
  FiRotateCcw,
  FiRotateCw,
  FiUnderline,
} from "react-icons/fi";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-5",
          },
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-23.75 px-4 py-4 text-[.9375rem] text-[#425069] outline-none ProseMirror",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-lg border border-[#e5e8ef] bg-white">
        <div className="flex h-10 items-center gap-4 border-b border-[#eff2f6] px-4 text-[#59657b]" />
        <div className="min-h-23.75 px-4 py-4 text-[.9375rem] text-[#a7b1c2]" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#e5e8ef] bg-white">
      <div className="flex h-10 items-center gap-4 border-b border-[#eff2f6] px-4 text-[#59657b]">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="cursor-pointer text-[#616b80] transition hover:text-[#425069]"
        >
          <FiRotateCcw className="size-3.75" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="cursor-pointer text-[#616b80] transition hover:text-[#425069]"
        >
          <FiRotateCw className="size-3.75" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="flex cursor-pointer items-center gap-1 text-[.8125rem] transition hover:text-[#425069]"
        >
          Normal text
          <FiChevronDown className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="flex cursor-pointer items-center gap-1 text-[.8125rem] transition hover:text-[#425069]"
        >
          <FiList className="size-3.75" />
          <FiChevronDown className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`cursor-pointer transition hover:text-[#425069] ${
            editor.isActive("bold") ? "text-[#425069]" : ""
          }`}
        >
          <FiBold className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`cursor-pointer transition hover:text-[#425069] ${
            editor.isActive("italic") ? "text-[#425069]" : ""
          }`}
        >
          <FiItalic className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`cursor-pointer transition hover:text-[#425069] ${
            editor.isActive("underline") ? "text-[#425069]" : ""
          }`}
        >
          <FiUnderline className="size-3.5" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
