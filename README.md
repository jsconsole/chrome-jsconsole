**JSconsole** is a Chrome Extension that helps developer to load external JS libraries within their favourite ❤️ developer console.
======

### [INSTALL EXTENSION](https://jsconsole.github.io)


![Screenshot](/app/images/icon-128.png)

### Features

* Load any library by name or URL with latest version.
* Search any library just by name.
* Alias to load the most famous libraries.
* List all the loaded libraries.
* Clear your console directly.

If you find it useful, you can show your support by sharing it in your social network or by simply letting me know how much you ❤️ it by tweeting to [@squiroid](https://twitter.com/squiroid).

### CONTRIBUTING
- ### Setup
    - [Fork **jsconsole.github.io**](https://help.github.com/articles/fork-a-repo) and clone it on your system.
    -  Install all the required dependencies by running `npm install` and `bower install`.
    -  Build this project by running `gulp build`. This creates `dist` folder containing files of your chrome-extension.
    -  Create a new branch out off `master` for your fix/feature by running `git checkout -b new-feature`.

- ### Things to remember
    - Do not fix multiple issues in a single commit. Keep them one thing per commit so that they can be picked easily in case only few commits require to be merged.
    - Before submitting a patch, rebase your branch on upstream `master` to make life easier for the merger.
    - **DO NOT** commit automatic build files or folders (`dist/** || node_modules || etc`) in your commits.

### TODOs

* Add separate watchers for HTML, CSS and JS files. 
* Delete `app/scripts` folder once `dist` folder has been made after every `gulp build`.
* Install CSS-linter.
* Write unit-test.

### License

MIT Licensed

Copyright (c) 2017 Rachit Gulati, [jsconsole.github.io](https://jsconsole.github.io)
