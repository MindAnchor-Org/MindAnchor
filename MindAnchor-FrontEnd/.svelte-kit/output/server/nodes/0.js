import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["app/immutable/nodes/0.BZ6BuNKf.js","app/immutable/chunks/BgcssLAV.js","app/immutable/chunks/DfSOqxX-.js"];
export const stylesheets = ["app/immutable/assets/0.CILR4D9e.css"];
export const fonts = [];
