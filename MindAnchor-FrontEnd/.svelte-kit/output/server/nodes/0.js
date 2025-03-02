import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["app/immutable/nodes/0.COvpPKkN.js","app/immutable/chunks/CaSjh4Oa.js","app/immutable/chunks/DKs-kS-g.js"];
export const stylesheets = ["app/immutable/assets/0.r_mg8ExW.css"];
export const fonts = [];
