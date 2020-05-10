var html = require('choo/html');
var choo = require('choo');
var devtools = require('choo-devtools');

import * as d3stuff from './d3-stuff';

var app = choo()

app.use(devtools())
app.use(mainStore)
app.route('/', mainView)
app.route('*', mainView)
app.mount('div.choo')

function mainView(state, emit) {
  d3stuff.setup({})
  return html`
  <div>hello</div>
  `
}

function mainStore(state, emitter) {
}
