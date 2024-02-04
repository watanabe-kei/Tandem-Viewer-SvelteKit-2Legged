# Tandem Viewer SvelteKit (2-Legged)
![Demo](https://github.com/watanabe-kei/Tandem-Viewer-SvelteKit-2Legged/assets/45413802/5839e663-4435-4e2e-b39f-c07472cdb9e1)

## Overview
This is a simple [Autodesk Tandem](https://intandem.autodesk.com/) Viewer built with [SvelteKit](https://kit.svelte.dev/).<br>
This sample provides a simple way to view a model in Tandem using the `2-legged authentication` flow.

## Prerequisites
- `Client ID` and `Client Secret` from APS Application
- Create some Facility in Tandem
- Add APS Application to Tandem Team as a member


## Running locally
1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Create a `.env.local` file in the root of the project and add the following environment variables:
```env
APS_KEY=<YOUR_APS_APP_CLIENT_ID>
APS_SECRET=<YOUR_APS_APP_CLIENT_SECRET>
``````
4. Run the app
```bash
npm run dev
```