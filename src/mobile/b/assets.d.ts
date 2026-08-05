/**
 * Vite resolves asset imports to URLs. The project's tsconfig doesn't pull in
 * `vite/client`, so the one shape actually used here is declared locally.
 */
declare module '*.svg' {
  const src: string
  export default src
}
