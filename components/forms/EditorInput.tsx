"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  ChangeEvent,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface TipTapProps {
  content: string;
  contentDisplayName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id?: string;
  contentOnly?: boolean;
}

const MenuBar = ({ editor, setLink, addImage, widthRef, contentOnly }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap gap-2 sm:text-sm items-center sticky top-[57px] md:top-[73px] bg-secondary z-10 text-black p-2 rounded-md`}
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        ul
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ol
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().setCodeBlock().run()}
      >
        code
      </button>
      |{" "}
      <button
        type="button"
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        set link
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        clear link
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      |{" "}
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      {!contentOnly && (
        <>
          |{" "}
          <button
            type="button"
            id="add"
            onClick={() => {
              const url = prompt("Enter YouTube URL");
              if (url) {
                editor.commands.setYoutubeVideo({
                  src: url,
                  width: widthRef.current?.clientWidth - 40,
                });
              }
            }}
          >
            Insert YouTube Video
          </button>
          |{" "}
          <input
            title="Insert an image to your content."
            type="file"
            id="file"
            onChange={addImage}
          />
        </>
      )}
    </div>
  );
};

const EditorInput = ({
  contentDisplayName,
  content,
  onChange,
  id,
  contentOnly = false,
}: TipTapProps) => {
  const [loading, setLoading] = useState(false);
  const widthRef = useRef<any>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Youtube.configure({
        inline: false,
      }),
      Image.configure({
        inline: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      if (editor) {
        const content = editor.getHTML();
        onChange &&
          onChange({
            target: { name: id ?? "", value: content },
          } as ChangeEvent<HTMLTextAreaElement>);
      }
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_self" })
      .run();
  }, [editor]);

  const addImage = useCallback(
    async (e: { preventDefault: () => void; target: { files: any[] } }) => {
      e.preventDefault();
      const file = e.target.files[0];
      const formData = new FormData();
      const url = process.env.cloudinaryUrl as string;
      formData.append("file", file);
      formData.append("upload_preset", "ka-app");

      setLoading && setLoading(true);
      const data = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      setLoading && setLoading(false);
      if (data.secure_url) {
        editor?.chain().focus().setImage({ src: data.secure_url }).run();
      }
    },
    [editor, setLoading]
  );

  useEffect(() => {
    editor?.setEditable(!loading);
  }, [loading, editor]);

  return (
    <div ref={widthRef}>
      <MenuBar
        editor={editor}
        setLink={setLink}
        addImage={addImage}
        widthRef={widthRef}
        contentOnly={contentOnly}
      />
      <div className="mt-3 block w-full appearance-none rounded-md border shadow-sm focus:border-black focus:outline-none focus:ring-black">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditorInput;
