## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Opens [http://localhost:3000](http://localhost:3000) web app and serves it inside Electron.

The app will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn dist`

Builds Electron and React production app

## Required VSCode extensions for code formatting on save

"esbenp.prettier-vscode",
"dbaeumer.vscode-eslint",
"rohit-gohri.format-code-action"

As prettier overrides the code with some changes that are not fully compatible with ESLint rules, we run them in following order: Prettier Formatting -> ESLint.fixAll
