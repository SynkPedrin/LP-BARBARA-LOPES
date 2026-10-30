type GoldRuleProps = { className?: string; delay?: number };

/** Linha fina dourada revelada da esquerda para a direita. */
export function GoldRule({ className = "", delay = 0 }: GoldRuleProps) {
  return (
    <span
      aria-hidden="true"
      data-reveal="line"
      className={`gold-rule block ${className}`}
      style={{ "--reveal-delay": delay } as React.CSSProperties}
    />
  );
}
