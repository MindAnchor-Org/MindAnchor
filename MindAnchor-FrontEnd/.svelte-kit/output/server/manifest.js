export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "app",
	appPath: "app",
	assets: new Set(["background.js","child_path.svg","content.js","favicon.png","global.d.js","hello_palm.png","icon.png","manifest.json","no_schedule.svg"]),
	mimeTypes: {".js":"text/javascript",".svg":"image/svg+xml",".png":"image/png",".json":"application/json"},
	_: {
		client: {start:"app/immutable/entry/start.-Y5ibWlq.js",app:"app/immutable/entry/app.DyiB40KN.js",imports:["app/immutable/entry/start.-Y5ibWlq.js","app/immutable/chunks/BP0ciIFs.js","app/immutable/chunks/DfSOqxX-.js","app/immutable/chunks/D8WOyEKT.js","app/immutable/entry/app.DyiB40KN.js","app/immutable/chunks/DfSOqxX-.js","app/immutable/chunks/FDJc48Q4.js","app/immutable/chunks/BgcssLAV.js","app/immutable/chunks/DB89Dqc7.js","app/immutable/chunks/D8WOyEKT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
