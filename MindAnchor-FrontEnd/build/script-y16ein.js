
				{
					__sveltekit_nakgfn = {
						base: new URL(".", location).pathname.slice(0, -1)
					};

					const element = document.currentScript.parentElement;

					Promise.all([
						import("./app/immutable/entry/start.CHH6SI_u.js"),
						import("./app/immutable/entry/app.oqdbaGH8.js")
					]).then(([kit, app]) => {
						kit.start(app, element, {
							node_ids: [0, 2],
							data: [null,null],
							form: null,
							error: null
						});
					});
				}
			