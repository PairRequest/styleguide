Pair Request Styleguide
---

## Installing
### Prerequisites

- Node & NPM `brew install node`
- Gulp `npm i -g gulp gulp-cli`

Clone the repository and run `npm install` from the root of the project. This installs the dependencies and starts Gulp. Your browser should be navigated to [localhost:3000](http://localhost:3000). After the first `npm install`, use the `gulp` command after when you want to revisit the project.

## Contributing

We're using PostCSS (specifically, [cssnext](http://cssnext.io/features/)) to compile the CSS and Handlebars to build components and templates.

To contribute:

- Make a new branch off of develop (that's true north)
- Name the branch `component/component-name`: `git checkout -b component/component-name`
- Create a CSS partial under `assets/styles/components/component-name.css` (then `@import './components/component-name';` in `assets/styles/index.css`)
- Do the same in with a Handlebars partial under `views/components/component-name.hbs` and pull in your partial wherever you need to `{{> component-name }}`
- When you're done working create a pull request for someone to review, ping a link to your PR in the [#pairrequest](https://embersherpa.slack.com/messages/pairrequest/) channel in Slack.
