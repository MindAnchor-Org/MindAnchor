export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "app",
	appPath: "app",
	assets: new Set(["background.js","calendar-icon.png","child_path.svg","content.js","favicon.png","global.d.js","hello_palm.png","icon.png","manifest.json","no_schedule.svg","pie-chart-icon.png","schedule-icon.svg","settings-icon.png","streak-icon.png","subscription-icon.png","user_progress-icon.png"]),
	mimeTypes: {".js":"text/javascript",".png":"image/png",".svg":"image/svg+xml",".json":"application/json"},
	_: {
		client: {start:"app/immutable/entry/start.DRd--gfG.js",app:"app/immutable/entry/app.BbVVSiqs.js",imports:["app/immutable/entry/start.DRd--gfG.js","app/immutable/chunks/C2P-FzoN.js","app/immutable/chunks/DKs-kS-g.js","app/immutable/chunks/BzUa6sB0.js","app/immutable/entry/app.BbVVSiqs.js","app/immutable/chunks/DKs-kS-g.js","app/immutable/chunks/CO5ajxW3.js","app/immutable/chunks/CaSjh4Oa.js","app/immutable/chunks/CfBocOi5.js","app/immutable/chunks/BzUa6sB0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
