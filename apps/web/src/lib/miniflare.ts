import { Miniflare, Log, LogLevel } from 'miniflare';
import { Cache } from "@miniflare/cache";
import { dev } from '$app/environment';

export const fallBackPlatformToMiniFlareInDev = async (_platform: App.Platform) => {
	if (!dev) return _platform;

	if (_platform) return _platform;
	const mf = new Miniflare({
		log: new Log(LogLevel.INFO),
		cachePersist: "./.data", // Custom path
		globalAsyncIO: true,
		globalTimers: true,
		globalRandom: true,

		script: `
		addEventListener("fetch", (event) => {
			event.waitUntil(Promise.resolve(event.request.url));
			event.respondWith(new Response(event.request.headers.get("X-Message")));
		});
		addEventListener("scheduled", (event) => {
			event.waitUntil(Promise.resolve(event.scheduledTime));
		});
		`
	});

	// await mf.dispatchFetch('https://host.tld');

	const caches = await mf.getCaches();

	const platform: App.Platform = { cache: caches.default };

	return platform;
};