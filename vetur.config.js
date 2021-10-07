// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    // **optional** default: `{}`
    // override vscode settings
    // Notice: It only affects the settings used by Vetur.
    settings: {
      "vetur.useWorkspaceDependencies": true,
      "vetur.experimental.templateInterpolationService": true
    },
    // **optional** default: `[{ root: './' }]`
    // support monorepos
    projects: [
      './packages/repo2', // Shorthand for specifying only the project root location
      {
        // **required**
        // Where is your project?
        // It is relative to `vetur.config.js`.
        root: '/FrontEnd/timecapsule',
        // **optional** default: `'package.json'`
        // Where is `package.json` in the project?
        // We use it to determine the version of vue.
        // It is relative to root property.
        package: '/FrontEnd/timecapsule/package.json'
      }
    ]
  }