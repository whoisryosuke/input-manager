# Input Map

An input manager and utilities for JavaScript/Typescript and React apps.

Manage multiple devices (keyboard, gamepad, touch, etc) and assign input mappings (e.g. "Jump" = "Spacebar"). Use React components to add device support (`<GamepadInput>`).

Inspired by [the Unity input mapping system.](https://docs.unity3d.com/Manual/class-InputManager.html)

> This library is WIP and **not intended for production** yet. See Roadmap for more info.

## How to use

`npm i input-map`

## Development

There's a NextJS website under `packages/docs` to be a playground to develop and test the library.

1. Fork/clone this repo: `https://github.com/whoisryosuke/react-typescript-monorepo-2022.git`
1. Install dependencies: `yarn`
1. Build the library: `yarn build`
1. Start the NextJS playground: `yarn dev`

## Building package

1. `yarn build`

This runs the `tsup` process for one package/module. Check the `package.json` and `packages/input-manager/package.json` for more info.

## Release to Github/NPM

This repo should automatically release to Github and NPM, as well as tag the release when you commit to `main`, `alpha`, or `beta` branches (change these in `package.json`).

You can learn more about the CI/CD workflow in the Github Actions folder.

### Setting up NPM

To setup NPM releases, you need to add your token to Github as an ENV var.

1. Make sure you've created a new repo for your package (not a fork).
1. Go to your repo settings.
1. Go to Environments
1. Create a new one called `production`
1. Add a `NPM_TOKEN` ENV with your token from NPM.

### Lint and Code Formatting

If you use VSCode, Prettier should run each time you save a compatible file.

> If you don't like this, go to `.vscode\settings.json` and disable there (or you can do it via your own VSCode settings).

`yarn lint` runs ESLint and Prettier, automatically formats files and rewrites them. Make sure to stage your code before running just in case.
