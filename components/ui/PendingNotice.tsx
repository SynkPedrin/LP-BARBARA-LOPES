import type { ReactNode } from "react";

/** Aviso interno de pendência de publicação. Exibido somente em desenvolvimento. */
export function PendingNotice({ children, className = "" }: { children: ReactNode; className?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p
      className={`rounded border border-dashed border-taupe/60 bg-white/60 px-4 py-3 text-xs leading-relaxed text-brown ${className}`}
    >
      <strong className="font-semibold">Pendente: </strong>
      {children}
    </p>
  );
}
