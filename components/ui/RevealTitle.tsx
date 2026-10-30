import type { ElementType, ReactNode } from "react";

type RevealTitleProps = {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
};

/** Título editorial revelado linha a linha por máscara. */
export function RevealTitle({ as: Tag = "h2", lines, className, delay = 0, id }: RevealTitleProps) {
  return (
    <Tag id={id} className={className} data-reveal-lines style={{ "--reveal-delay": delay } as React.CSSProperties}>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <span className="line-inner" style={{ "--line-index": index } as React.CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
