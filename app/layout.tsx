import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hydration repro",
  description: "data-cursor-ref hydration mismatch",
};

// Stands in for Cursor's built-in browser, which sets data-cursor-ref on
// elements before React hydrates. Runs while the document is parsing.
const stampCursorRefs = `(function () {
  var n = 0;
  function stamp(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.matches && node.matches("h1, p") && !node.hasAttribute("data-cursor-ref")) {
      node.setAttribute("data-cursor-ref", "e" + n++);
    }
    if (node.querySelectorAll) node.querySelectorAll("h1, p").forEach(stamp);
  }
  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var nodes = records[i].addedNodes;
      for (var j = 0; j < nodes.length; j++) stamp(nodes[j]);
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: stampCursorRefs }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
