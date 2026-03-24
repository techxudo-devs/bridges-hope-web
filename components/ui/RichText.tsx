import React from "react";

type BlockChild = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

type ContentBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: BlockChild[];
};

const renderChild = (child: BlockChild, index: number): React.ReactNode => {
  let content: React.ReactNode = child.text ?? "";

  if (child.marks?.includes("bold")) {
    content = <strong key={`b-${child._key ?? index}`}>{content}</strong>;
  }
  if (child.marks?.includes("italic")) {
    content = <em key={`i-${child._key ?? index}`}>{content}</em>;
  }
  if (child.marks?.includes("underline")) {
    content = <u key={`u-${child._key ?? index}`}>{content}</u>;
  }
  if (child.marks?.includes("code")) {
    content = (
      <code key={`c-${child._key ?? index}`} className="bg-slate-100 px-1 rounded text-sm font-mono">
        {content}
      </code>
    );
  }

  return <React.Fragment key={child._key ?? index}>{content}</React.Fragment>;
};

export const RichText = ({ blocks, className = "" }: { blocks?: ContentBlock[]; className?: string }) => {
  if (!blocks?.length) return null;

  const result: React.ReactNode[] = [];
  let listBuffer: { type: string; items: React.ReactNode[] } | null = null;

  const flushList = (key: string) => {
    if (!listBuffer) return;
    const listClass = "ps-6 space-y-1 mt-4 text-slate-600";
    result.push(
      listBuffer.type === "bullet" ? (
        <ul key={key} className={`list-disc ${listClass}`}>{listBuffer.items}</ul>
      ) : (
        <ol key={key} className={`list-decimal ${listClass}`}>{listBuffer.items}</ol>
      )
    );
    listBuffer = null;
  };

  blocks.forEach((block, index) => {
    if (block._type !== "block") return;

    const children = block.children?.map(renderChild) ?? [];

    if (block.listItem) {
      if (!listBuffer || listBuffer.type !== block.listItem) {
        flushList(`list-${index}`);
        listBuffer = { type: block.listItem, items: [] };
      }
      listBuffer.items.push(<li key={block._key ?? index}>{children}</li>);
      return;
    }

    flushList(`flush-${index}`);

    switch (block.style) {
      case "h2":
        result.push(
          <h2 key={block._key ?? index} className="text-2xl font-bold mt-10 mb-3 text-secondary">
            {children}
          </h2>
        );
        break;
      case "h3":
        result.push(
          <h3 key={block._key ?? index} className="text-xl font-semibold mt-8 mb-2 text-secondary">
            {children}
          </h3>
        );
        break;
      case "h4":
        result.push(
          <h4 key={block._key ?? index} className="text-lg font-semibold mt-6 mb-2 text-secondary">
            {children}
          </h4>
        );
        break;
      case "blockquote":
        result.push(
          <blockquote
            key={block._key ?? index}
            className="border-s-4 border-primary ps-5 italic text-slate-600 mt-6 py-2"
          >
            {children}
          </blockquote>
        );
        break;
      default:
        result.push(
          <p key={block._key ?? index} className="text-slate-600 leading-relaxed mt-4">
            {children}
          </p>
        );
    }
  });

  flushList("list-end");

  return <div className={`rich-text ${className}`}>{result}</div>;
};

export default RichText;
