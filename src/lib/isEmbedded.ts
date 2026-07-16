/**
 * True when this document is running inside a PatternStage iframe, where it should
 * render the bare shell — no switcher, no modes of its own.
 */
export function isEmbedded(): boolean {
  try {
    return window.self !== window.top
  } catch {
    // Cross-origin access throws, which can only happen when framed.
    return true
  }
}
