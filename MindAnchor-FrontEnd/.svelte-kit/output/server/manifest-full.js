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
		client: {start:"app/immutable/entry/start.CGspzrwe.js",app:"app/immutable/entry/app.B4-pWZdE.js",imports:["app/immutable/entry/start.CGspzrwe.js","app/immutable/chunks/DkzLTNvu.js","app/immutable/chunks/DKs-kS-g.js","app/immutable/chunks/BzUa6sB0.js","app/immutable/entry/app.B4-pWZdE.js","app/immutable/chunks/DKs-kS-g.js","app/immutable/chunks/CO5ajxW3.js","app/immutable/chunks/CaSjh4Oa.js","app/immutable/chunks/CfBocOi5.js","app/immutable/chunks/BzUa6sB0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
