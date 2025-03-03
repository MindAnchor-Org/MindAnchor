
				{
					__sveltekit_wb5odx = {
						base: new URL(".", location).pathname.slice(0, -1)
					};

					const element = document.currentScript.parentElement;

					Promise.all([
						import("./app/immutable/entry/start.CC-b8-_f.js"),
						import("./app/immutable/entry/app.QXe4Y8T7.js")
					]).then(([kit, app]) => {
						kit.start(app, element, {
							node_ids: [0, 2],
							data: [null,null],
							form: null,
							error: null
						});
					});
				}
			