import { Fragment, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

/**
 * Splits its text into one span per letter, each carrying its position in the line, so CSS can
 * lift them into place one after another once a `Reveal` around it adds the `in` class.
 *
 * Nested markup is kept intact: an italic span inside a heading still renders as an italic span,
 * its letters simply continue the count. Words are kept whole so the line still wraps normally,
 * and the original text stays readable for screen readers and search engines through an
 * aria-label on the wrapper.
 */
function splitNode(node: ReactNode, count: { n: number }, key: number): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((chunk, ci) => {
      if (!chunk) return null;
      if (/^\s+$/.test(chunk)) return chunk;
      return (
        <span key={`${key}-${ci}`} className="wave-word">
          {[...chunk].map((ch, i) => (
            <span key={i} className="wave-ch" style={{ "--i": count.n++ } as CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      );
    });
  }
  // each branch gets its own key, or React warns about the list it gets back
  if (Array.isArray(node))
    return node.map((child, ci) => <Fragment key={ci}>{splitNode(child, count, ci)}</Fragment>);
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return cloneElement(el, undefined, splitNode(el.props.children, count, 0));
  }
  return node;
}

export default function WaveText({ children, text }: { children: ReactNode; text: string }) {
  const count = { n: 0 };
  return (
    <span className="wave-text" aria-label={text}>
      <span aria-hidden="true">{splitNode(children, count, 0)}</span>
    </span>
  );
}
