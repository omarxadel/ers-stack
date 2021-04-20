## Electron-React-SQLite Stack Boilerplate

This is a simple boilerplate to get up and running with Electron, React and SQLite. It's made for simple desktop apps with a local SQL database. It's just the simple electron react boilerplate from [Brad Traversy](https://github.com/bradtraversy) . [Simple Electron React App](https://github.com/bradtraversy/simple-electron-react) with SQLite and Knex added to it.

### Install

#### Clone this repo

```
git clone https://github.com/omarxadel/ers-stack
```

#### Install dependencies

```
npm install
```

or

```
yarn
```

### Usage

#### Run the app

```
npm run start
```

or

```
yarn start
```

#### Build the app (automatic)

```
npm run package
```

or

```
yarn package
```

#### Build the app (manual)

```
npm run build
```

or

```
yarn build
```

#### Test the app (after `npm run build` || `yarn run build`)

```
npm run prod
```

```
yarn prod
```

### Change app title

Change the app title in the **webpack.build.config.js** and the **webpack.dev.config.js** files
