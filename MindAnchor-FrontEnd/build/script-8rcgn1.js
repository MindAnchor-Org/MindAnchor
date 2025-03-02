
				{
					__sveltekit_ohehi2 = {
						base: new URL(".", location).pathname.slice(0, -1)
					};

					const element = document.currentScript.parentElement;

					Promise.all([
						import("./app/immutable/entry/start.DlIomaDy.js"),
						import("./app/immutable/entry/app.YchquobW.js")
					]).then(([kit, app]) => {
						kit.start(app, element, {
							node_ids: [0, 2],
							data: [null,null],
							form: null,
							error: null
						});
					});
				}
			