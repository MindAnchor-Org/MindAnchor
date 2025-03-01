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
		client: {start:"app/immutable/entry/start.Cg9n4qrs.js",app:"app/immutable/entry/app.VBS6wVC6.js",imports:["app/immutable/entry/start.Cg9n4qrs.js","app/immutable/chunks/Dl0r6p5v.js","app/immutable/chunks/SAwWdC3S.js","app/immutable/chunks/5HM7GFqA.js","app/immutable/entry/app.VBS6wVC6.js","app/immutable/chunks/SAwWdC3S.js","app/immutable/chunks/BdiXhtWr.js","app/immutable/chunks/_7xKrvNi.js","app/immutable/chunks/CHVdWlY3.js","app/immutable/chunks/5HM7GFqA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
