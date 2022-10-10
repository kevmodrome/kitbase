# WIP: KitBase Starter Template

This is a starter template for SvelteKit and PocketBase. Set up to use Cloudflare KV for caching (has to be manually handled). Local development done in

## What's inside?

A starter template to quickly get up and running.

### Features

- Auth
- Stripe
- Admin CMS courtesy of PocketBase
- Cloudflare Dev Environment that supports their distributed KV store.
- Styling using [Open Props](https://open-props.style).
- Testing using PlayWright (WIP)

### Apps and Packages

- `web`: a [SvelteKit](https://kit.svelte.dev) app
- `backend`: a [PocketBase](https://pocketbase.io) repo. Just contains a built Go binary and some data to get started.

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

## ENV

Needs the following environment variables and secrets set up.

```
API_URL=http://127.0.0.1:8090
GITHUB_REDIRECT_URL=http://localhost:5173/auth/redirect
STRIPE_KEY=
STRIPE_WEBHOOK_SECRET=
```
