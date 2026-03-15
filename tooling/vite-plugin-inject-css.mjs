/**
 * Injects a side-effect import of the package's emitted CSS into the built JS entry.
 * So when the consumer imports from this package, the bundler pulls in only this package's CSS.
 */
export default function injectCssPlugin() {
  return {
    name: "inject-css-side-effect",
    apply: "build",
    renderChunk(code, chunk) {
      if (chunk.isEntry) return { code: 'import "./index.css";\n' + code };
      return null;
    },
  };
}
