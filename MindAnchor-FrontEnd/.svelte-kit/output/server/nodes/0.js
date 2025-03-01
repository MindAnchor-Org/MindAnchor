import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["app/immutable/nodes/0.CV2pimt3.js","app/immutable/chunks/DXQeNKrf.js","app/immutable/chunks/DPnyhNSh.js"];
export const stylesheets = ["app/immutable/assets/0.HovMJygD.css"];
export const fonts = [];
