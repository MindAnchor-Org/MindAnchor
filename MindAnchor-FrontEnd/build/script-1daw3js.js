
				{
					__sveltekit_1ue34dw = {
						base: new URL(".", location).pathname.slice(0, -1)
					};

					const element = document.currentScript.parentElement;

					Promise.all([
						import("./app/immutable/entry/start.Cg9n4qrs.js"),
						import("./app/immutable/entry/app.VBS6wVC6.js")
					]).then(([kit, app]) => {
						kit.start(app, element, {
							node_ids: [0, 2],
							data: [null,null],
							form: null,
							error: null
						});
					});
				}
			