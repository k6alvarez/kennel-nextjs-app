import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import styled from "styled-components";
import {
  BoldOutlined,
  ItalicOutlined,
  LoadingOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  UnorderedListOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button } from "./Base";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import { StyledInput } from "../Forms/styles";
import { message } from "antd";

const Flex = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.space[3]};
`;

const EditorContentWrapper = styled.div`
  padding: ${({ theme }) => theme.space[1]};
`;

const Container = styled.div`
  /* Basic editor styles */
  padding: ${({ theme }) => theme.space[4]};
  box-shadow: ${({ theme }) => theme.shadows.light};

  .ProseMirror {
    padding: ${({ theme }) => theme.space[4]};
    > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }
  }
`;

export const TipTapMenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[3]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const MenuBar = ({ editor, setLink, addImage, widthRef, heightRef }) => {
  if (!editor) {
    return null;
  }

  return (
    <TipTapMenuWrapper>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <BoldOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <ItalicOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <StrikethroughOutlined />
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <UnorderedListOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <OrderedListOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        set link
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        clear link
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <UndoOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RedoOutlined />
      </button>
      <button
        id="add"
        onClick={() => {
          const url = prompt("Enter YouTube URL");

          if (url) {
            editor.commands.setYoutubeVideo({
              src: url,
              width: Math.max(320, parseInt(widthRef.current.value, 10)) || 640,
              height:
                Math.max(180, parseInt(heightRef.current.value, 10)) || 480,
            });
          }
        }}
      >
        <YoutubeOutlined /> YouTube
      </button>
      <StyledInput
        title="Insert an image to your content."
        type="file"
        id="file"
        onChange={addImage}
      />
      <Flex>
        <input
          id="width"
          type="hidden"
          min="320"
          max="1024"
          ref={widthRef}
          placeholder="width"
        />
        <input
          id="height"
          type="hidden"
          min="180"
          max="720"
          ref={heightRef}
          placeholder="height"
        />
      </Flex>
    </TipTapMenuWrapper>
  );
};

export const Tiptap = ({
  content,
  onSave = undefined,
  isLoading = false,
  buttonText = "Save Changes",
}) => {
  const widthRef = React.useRef(null);
  const heightRef = React.useRef(null);
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
    content,
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_self" })
      .run();
  }, [editor]);

  const addImage = useCallback(
    async (e) => {
      console.log("addImage");
      e.preventDefault();
      const file = e.target.files[0];
      console.log("🚀 ~ file: Tiptap.tsx:298 ~ file", file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gk-app");

      message.loading(`Uploading your image.`);
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dhcv2fdfq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());

      if (data.secure_url) {
        editor.chain().focus().setImage({ src: data.secure_url }).run();
      }
    },
    [editor]
  );

  React.useEffect(() => {
    if (widthRef.current && heightRef.current) {
      widthRef.current.value = 640;
      heightRef.current.value = 480;
    }
  }, [widthRef.current, heightRef.current]);

  return (
    <Container>
      <MenuBar
        editor={editor}
        setLink={setLink}
        addImage={addImage}
        widthRef={widthRef}
        heightRef={heightRef}
      />
      <EditorContentWrapper>
        <EditorContent editor={editor} />
      </EditorContentWrapper>
      {onSave && (
        <Button
          primary
          onClick={() => {
            const html = editor.getHTML();
            onSave(html, editor);
          }}
        >
          {isLoading ? (
            <span>
              <LoadingOutlined /> Saving
            </span>
          ) : (
            buttonText
          )}
        </Button>
      )}
    </Container>
  );
};
