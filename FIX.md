> bun run build
$ next build --turbopack
▲ Next.js 16.1.6 (Turbopack)
- Environments: .env.local

[MDX] generated files in 42.715599999999995ms
  Creating an optimized production build ...
✓ Compiled successfully in 25.3s
  Running TypeScript  .Failed to compile.

./lib/source.ts:7:18
Type error: Property 'toFumadocsSource' does not exist on type 'DocCollectionEntry<"guides", { title: string; description?: string | undefined; icon?: string | undefined; full?: boolean | undefined; _openapi?: { [x: string]: unknown; } | undefined; }, InternalTypeConfig & { ...; }>[]'.

   5 | export const guidesSource = loader({
   6 |   baseUrl: "/guides",
>  7 |   source: guides.toFumadocsSource(),
     |                  ^
   8 | })
   9 |
  10 | export const resourcesSource = loader({
Next.js build worker exited with code: 1 and signal: null
error: script "build" exited with code 1

