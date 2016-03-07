const paths = {
  views: './views/',
  viewSrc: './views/**/*.hbs',
  partials: './views/components/',
  build: './dist',
  img: './assets/images/**/*',
  cssLib: './assets/styles/**/*.css',
  cssSrc: './assets/styles/index.css',
  js: {
    src: './assets/scripts/global.js',
    all: './assets/scripts/**/*.js',
    dest: './dist/assets/scripts/'
  },
};

module.exports = paths;
