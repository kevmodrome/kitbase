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
- Histoire support
- Testing using PlayWright (WIP)
- Plugins using unplugin-icons

### Apps and Packages

- `web`: a [SvelteKit](https://kit.svelte.dev) app
- `backend`: a [PocketBase](https://pocketbase.io) repo. Just contains a built Go binary and some data to get started.

## Getting started

### Develop

After running the dev command, create an account in the PocketBase app running at `localhost:8090/`. Go to the import collections tab and use the `pb_schema.json` file found in the `backend` folder.

Make sure all the environment variables are set up correctly. The template uses GitHub OAuth to log in, so in order to set it up you need to create an application there and those settings to PocketBase. Before that you won't be able to log in.

When everything is set up run the following command from the root folder:

```
pnpm run dev
```

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

## ENV

Needs the following environment variables and secrets set up.

```
API_URL=http://127.0.0.1:8090
GITHUB_REDIRECT_URL=http://localhost:5173/auth/redirect
STRIPE_KEY=
STRIPE_WEBHOOK_SECRET=
```
