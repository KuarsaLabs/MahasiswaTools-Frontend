import React, { useCallback, useMemo } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import {
  Editor,
  Element as SlateElement,
  Transforms,
  createEditor,
  Node,
} from "slate";
import type { BaseEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import type { HistoryEditor } from "slate-history";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import type { ReactEditor } from "slate-react";
import { ToolbarButton, Icon, Toolbar } from "./components";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiCodeLine,
  RiH1,
  RiH2,
  RiDoubleQuotesL,
  RiListOrdered,
  RiListUnordered,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
} from "react-icons/ri";

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

type ParagraphElement = {
  type: "paragraph";
  align?: AlignType;
  children: CustomText[];
};

type HeadingOneElement = {
  type: "heading-one";
  align?: AlignType;
  children: CustomText[];
};

type HeadingTwoElement = {
  type: "heading-two";
  align?: AlignType;
  children: CustomText[];
};

type BlockQuoteElement = {
  type: "block-quote";
  align?: AlignType;
  children: CustomText[];
};

type ListItemElement = {
  type: "list-item";
  align?: AlignType;
  children: CustomText[];
};

type BulletedListElement = {
  type: "bulleted-list";
  align?: AlignType;
  children: ListItemElement[];
};

type NumberedListElement = {
  type: "numbered-list";
  align?: AlignType;
  children: ListItemElement[];
};

type CustomElement =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | BlockQuoteElement
  | ListItemElement
  | BulletedListElement
  | NumberedListElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & HistoryEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// @note inline type definitions to avoid import issues
type CustomTextKey = "bold" | "italic" | "underline" | "code";
type CustomElementType =
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "block-quote"
  | "numbered-list"
  | "bulleted-list"
  | "list-item";

// @note list and alignment types
const LIST_TYPES = ["numbered-list", "bulleted-list"] as const;
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"] as const;

type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
type ListType = (typeof LIST_TYPES)[number];
type CustomElementFormat = CustomElementType | AlignType | ListType;

// Using RenderElementProps and RenderLeafProps from slate-react types

// @note initial editor value
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

// @note rich text editor component
export const RichTextEditor = ({
  initialContent,
  onContentChange,
}: {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // @note parse content and extract between --- markers
  const parseContent = (content: string): Descendant[] => {
    // Extract content between --- markers
    const match = content.match(/---\s*\n([\s\S]*?)\n---/);
    if (!match) {
      return [
        {
          type: "paragraph",
          children: [{ text: content }],
        },
      ];
    }

    const extractedContent = match[1];
    const lines = extractedContent
      .split("\n")
      .filter((line: string) => line.trim());

    const parsedNodes: Descendant[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (!trimmedLine) continue;

      // Parse different formatting patterns
      if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        // Bold heading
        const text = trimmedLine.slice(2, -2);
        parsedNodes.push({
          type: "heading-one",
          children: [{ text, bold: true }],
        });
      } else if (
        trimmedLine.startsWith("*   **") &&
        trimmedLine.endsWith("**")
      ) {
        // Subheading with bold
        const text = trimmedLine.slice(6, -2);
        parsedNodes.push({
          type: "heading-two",
          children: [{ text, bold: true }],
        });
      } else if (trimmedLine.startsWith("*   ")) {
        // Bullet point
        const text = trimmedLine.slice(4);
        parsedNodes.push({
          type: "bulleted-list",
          children: [
            {
              type: "list-item",
              children: [{ text }],
            },
          ],
        });
      } else if (/^\d+\.\s/.test(trimmedLine)) {
        // Numbered list
        const text = trimmedLine.replace(/^\d+\.\s/, "");
        parsedNodes.push({
          type: "numbered-list",
          children: [
            {
              type: "list-item",
              children: [{ text }],
            },
          ],
        });
      } else if (
        trimmedLine.startsWith("    *   **") &&
        trimmedLine.endsWith("**")
      ) {
        // Nested bold subheading
        const text = trimmedLine.slice(10, -2);
        parsedNodes.push({
          type: "heading-two",
          children: [{ text, bold: true }],
        });
      } else if (trimmedLine.startsWith("    *   ")) {
        // Nested bullet point
        const text = trimmedLine.slice(8);
        parsedNodes.push({
          type: "bulleted-list",
          children: [
            {
              type: "list-item",
              children: [{ text }],
            },
          ],
        });
      } else {
        // Regular paragraph
        parsedNodes.push({
          type: "paragraph",
          children: [{ text: trimmedLine }],
        });
      }
    }

    return parsedNodes;
  };

  // @note update editor content when initialContent changes
  React.useEffect(() => {
    if (initialContent) {
      const parsedNodes = parseContent(initialContent);

      // Clear editor and insert new content safely
      Editor.withoutNormalizing(editor, () => {
        // Check if editor has content before trying to delete
        if (editor.children.length > 0) {
          Transforms.delete(editor, {
            at: {
              anchor: Editor.start(editor, []),
              focus: Editor.end(editor, []),
            },
          });
        }
        Transforms.insertNodes(editor, parsedNodes, { at: [0] });
      });
    }
  }, [initialContent, editor]);

  // @note handle content changes
  const handleContentChange = useCallback(() => {
    if (onContentChange) {
      const content = editor.children.map((n) => Node.string(n)).join("\n\n");
      onContentChange(content);
    }
  }, [editor, onContentChange]);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Toolbar>
          <MarkButton format="bold" icon={<RiBold />} />
          <MarkButton format="italic" icon={<RiItalic />} />
          <MarkButton format="underline" icon={<RiUnderline />} />
          <MarkButton format="code" icon={<RiCodeLine />} />
          <BlockButton format="heading-one" icon={<RiH1 />} />
          <BlockButton format="heading-two" icon={<RiH2 />} />
          <BlockButton format="block-quote" icon={<RiDoubleQuotesL />} />
          <BlockButton format="numbered-list" icon={<RiListOrdered />} />
          <BlockButton format="bulleted-list" icon={<RiListUnordered />} />
          <BlockButton format="left" icon={<RiAlignLeft />} />
          <BlockButton format="center" icon={<RiAlignCenter />} />
          <BlockButton format="right" icon={<RiAlignRight />} />
          <BlockButton format="justify" icon={<RiAlignJustify />} />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          className="min-h-[400px] p-4 focus:outline-none text-foreground bg-card"
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            const isMod = event.ctrlKey || event.metaKey;
            if (!isMod) return;

            const key = event.key.toLowerCase();
            if (key === "b") {
              event.preventDefault();
              toggleMark(editor, "bold");
            } else if (key === "i") {
              event.preventDefault();
              toggleMark(editor, "italic");
            } else if (key === "u") {
              event.preventDefault();
              toggleMark(editor, "underline");
            } else if (key === "`") {
              event.preventDefault();
              toggleMark(editor, "code");
            }
          }}
          onChange={handleContentChange}
        />
      </div>
    </Slate>
  );
};

// @note toggle block formatting
const toggleBlock = (editor: Editor, format: CustomElementFormat) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? "align" : "type",
  );
  const isList = isListType(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });

  let newProperties: Partial<CustomElement>;
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }

  Transforms.setNodes(editor, newProperties as Partial<CustomElement>);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// @note toggle mark formatting
const toggleMark = (editor: Editor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// @note check if block is active
const isBlockActive = (
  editor: Editor,
  format: CustomElementFormat,
  blockType: "type" | "align" = "type",
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === "align" && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    }),
  );

  return !!match;
};

// @note check if mark is active
const isMarkActive = (editor: Editor, format: CustomTextKey) => {
  const marks = Editor.marks(editor) as Partial<
    Record<CustomTextKey, boolean>
  > | null;
  return marks ? marks[format] === true : false;
};

// @note render element component
const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {};
  if ("align" in element) {
    style.textAlign = element.align as AlignType;
  }

  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={style}
          {...attributes}
          className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul
          style={style}
          {...attributes}
          className="list-disc list-inside text-foreground"
        >
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1
          style={style}
          {...attributes}
          className="text-2xl font-bold text-foreground"
        >
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2
          style={style}
          {...attributes}
          className="text-xl font-semibold text-foreground"
        >
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes} className="text-foreground">
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol
          style={style}
          {...attributes}
          className="list-decimal list-inside text-foreground"
        >
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes} className="text-foreground">
          {children}
        </p>
      );
  }
};

// @note render leaf component
const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <code className="bg-muted px-1 rounded text-foreground">{children}</code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

// @note block button component
interface BlockButtonProps {
  format: CustomElementFormat;
  icon: React.ReactNode;
}

const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      active={isBlockActive(
        editor,
        format,
        isAlignType(format) ? "align" : "type",
      )}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleBlock(editor, format)}
    >
      <Icon>{icon}</Icon>
    </ToolbarButton>
  );
};

// @note mark button component
interface MarkButtonProps {
  format: CustomTextKey;
  icon: React.ReactNode;
}

const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      active={isMarkActive(editor, format)}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleMark(editor, format)}
    >
      <Icon>{icon}</Icon>
    </ToolbarButton>
  );
};

// @note type guards
const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};

const isAlignElement = (
  element: CustomElement | { align?: AlignType },
): element is { align?: AlignType } => {
  return typeof element === "object" && element != null && "align" in element;
};
