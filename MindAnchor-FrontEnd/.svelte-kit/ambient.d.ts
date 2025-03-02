
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const ELECTRON_RUN_AS_NODE: string;
	export const ALSA_CONFIG_DIR: string;
	export const ALSA_CONFIG_PATH: string;
	export const AT_SPI_BUS_ADDRESS: string;
	export const CHROME_DESKTOP: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const DBUS_SYSTEM_BUS_ADDRESS: string;
	export const DEBUGINFOD_IMA_CERT_PATH: string;
	export const DEBUGINFOD_URLS: string;
	export const DESKTOP_SESSION: string;
	export const DISPLAY: string;
	export const EDITOR: string;
	export const ELECTRON_NO_ATTACH_CONSOLE: string;
	export const FLATPAK_ID: string;
	export const FLATPAK_SANDBOX_DIR: string;
	export const GDK_BACKEND: string;
	export const GDMSESSION: string;
	export const GDM_LANG: string;
	export const GIO_LAUNCHED_DESKTOP_FILE: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const GI_TYPELIB_PATH: string;
	export const GJS_DEBUG_OUTPUT: string;
	export const GJS_DEBUG_TOPICS: string;
	export const GNOME_SETUP_DISPLAY: string;
	export const GPG_TTY: string;
	export const GST_PLUGIN_SYSTEM_PATH: string;
	export const HISTCONTROL: string;
	export const HISTSIZE: string;
	export const HOME: string;
	export const HOSTNAME: string;
	export const INVOCATION_ID: string;
	export const JOURNAL_STREAM: string;
	export const LANG: string;
	export const LD_LIBRARY_PATH: string;
	export const LESSOPEN: string;
	export const LOGNAME: string;
	export const MAIL: string;
	export const MANAGERPID: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const MOZ_GMP_PATH: string;
	export const NO_AT_BRIDGE: string;
	export const NPM_CONFIG_GLOBALCONFIG: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const PATH: string;
	export const PULSE_CLIENTCONFIG: string;
	export const PULSE_SERVER: string;
	export const PWD: string;
	export const PYTHONUSERBASE: string;
	export const QT_IM_MODULE: string;
	export const SANDBOX_LD_LIBRARY_PATH: string;
	export const SBX_CHROME_API_RQ: string;
	export const SESSION_MANAGER: string;
	export const SHELL: string;
	export const SHLVL: string;
	export const SSH_AUTH_SOCK: string;
	export const SYSTEMD_EXEC_PID: string;
	export const SYSTEMD_SLEEP_FREEZE_USER_SESSIONS: string;
	export const USER: string;
	export const USERNAME: string;
	export const VSCODE_CLI: string;
	export const VSCODE_CODE_CACHE_PATH: string;
	export const VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
	export const VSCODE_CWD: string;
	export const VSCODE_ESM_ENTRYPOINT: string;
	export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
	export const VSCODE_IPC_HOOK: string;
	export const VSCODE_NLS_CONFIG: string;
	export const VSCODE_PID: string;
	export const WAYLAND_DISPLAY: string;
	export const XAUTHORITY: string;
	export const XCURSOR_PATH: string;
	export const XDG_CACHE_HOME: string;
	export const XDG_CONFIG_DIRS: string;
	export const XDG_CONFIG_HOME: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const XDG_DATA_DIRS: string;
	export const XDG_DATA_HOME: string;
	export const XDG_MENU_PREFIX: string;
	export const XDG_RUNTIME_DIR: string;
	export const XDG_SESSION_CLASS: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XDG_SESSION_TYPE: string;
	export const XDG_STATE_HOME: string;
	export const XMODIFIERS: string;
	export const ZYPAK_BIN: string;
	export const ZYPAK_LIB: string;
	export const ZYPAK_ZYGOTE_STRATEGY_SPAWN: string;
	export const __EGL_EXTERNAL_PLATFORM_CONFIG_DIRS: string;
	export const container: string;
	export const ELECTRON_NO_ASAR: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		ELECTRON_RUN_AS_NODE: string;
		ALSA_CONFIG_DIR: string;
		ALSA_CONFIG_PATH: string;
		AT_SPI_BUS_ADDRESS: string;
		CHROME_DESKTOP: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		DBUS_SYSTEM_BUS_ADDRESS: string;
		DEBUGINFOD_IMA_CERT_PATH: string;
		DEBUGINFOD_URLS: string;
		DESKTOP_SESSION: string;
		DISPLAY: string;
		EDITOR: string;
		ELECTRON_NO_ATTACH_CONSOLE: string;
		FLATPAK_ID: string;
		FLATPAK_SANDBOX_DIR: string;
		GDK_BACKEND: string;
		GDMSESSION: string;
		GDM_LANG: string;
		GIO_LAUNCHED_DESKTOP_FILE: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		GI_TYPELIB_PATH: string;
		GJS_DEBUG_OUTPUT: string;
		GJS_DEBUG_TOPICS: string;
		GNOME_SETUP_DISPLAY: string;
		GPG_TTY: string;
		GST_PLUGIN_SYSTEM_PATH: string;
		HISTCONTROL: string;
		HISTSIZE: string;
		HOME: string;
		HOSTNAME: string;
		INVOCATION_ID: string;
		JOURNAL_STREAM: string;
		LANG: string;
		LD_LIBRARY_PATH: string;
		LESSOPEN: string;
		LOGNAME: string;
		MAIL: string;
		MANAGERPID: string;
		MEMORY_PRESSURE_WATCH: string;
		MEMORY_PRESSURE_WRITE: string;
		MOZ_GMP_PATH: string;
		NO_AT_BRIDGE: string;
		NPM_CONFIG_GLOBALCONFIG: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		PATH: string;
		PULSE_CLIENTCONFIG: string;
		PULSE_SERVER: string;
		PWD: string;
		PYTHONUSERBASE: string;
		QT_IM_MODULE: string;
		SANDBOX_LD_LIBRARY_PATH: string;
		SBX_CHROME_API_RQ: string;
		SESSION_MANAGER: string;
		SHELL: string;
		SHLVL: string;
		SSH_AUTH_SOCK: string;
		SYSTEMD_EXEC_PID: string;
		SYSTEMD_SLEEP_FREEZE_USER_SESSIONS: string;
		USER: string;
		USERNAME: string;
		VSCODE_CLI: string;
		VSCODE_CODE_CACHE_PATH: string;
		VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
		VSCODE_CWD: string;
		VSCODE_ESM_ENTRYPOINT: string;
		VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
		VSCODE_IPC_HOOK: string;
		VSCODE_NLS_CONFIG: string;
		VSCODE_PID: string;
		WAYLAND_DISPLAY: string;
		XAUTHORITY: string;
		XCURSOR_PATH: string;
		XDG_CACHE_HOME: string;
		XDG_CONFIG_DIRS: string;
		XDG_CONFIG_HOME: string;
		XDG_CURRENT_DESKTOP: string;
		XDG_DATA_DIRS: string;
		XDG_DATA_HOME: string;
		XDG_MENU_PREFIX: string;
		XDG_RUNTIME_DIR: string;
		XDG_SESSION_CLASS: string;
		XDG_SESSION_DESKTOP: string;
		XDG_SESSION_TYPE: string;
		XDG_STATE_HOME: string;
		XMODIFIERS: string;
		ZYPAK_BIN: string;
		ZYPAK_LIB: string;
		ZYPAK_ZYGOTE_STRATEGY_SPAWN: string;
		__EGL_EXTERNAL_PLATFORM_CONFIG_DIRS: string;
		container: string;
		ELECTRON_NO_ASAR: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
