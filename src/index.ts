var html = require('choo/html');
var choo = require('choo');
var devtools = require('choo-devtools');

import * as d3stuff from './d3-stuff';
var usStateIds = require('../assets/us-states-geo-ids.json');

var app = choo()

app.use(devtools())
app.use(mainStore)
app.route('/', mainView)
app.route('*', mainView)
app.mount('div.choo')

const DEFAULT_STATE_MSG = "Select a State"

function mainView(state, emit) {
  if(!state.d3rendered) {
    d3stuff.setup(emit)
    state.d3rendered = true;
  }
  return html`
  <div>state: ${state.selectedState}</div>
  `
}

function mainStore(state, emitter) {
state.selectedState = DEFAULT_STATE_MSG
state.d3rendered = false;
emitter.on("d3 map selected", (d) => {
  state.selectedState = mapStateIdToName(d.id)
  emitter.emit("render");
})
emitter.on("d3 map de-selected", () => {
  state.selectedState = DEFAULT_STATE_MSG
  emitter.emit("render");
})
}

function mapStateIdToName(selectedId) {
return usStateIds.reduce((acc, curr) => {
  let matchId = parseInt(curr.id)
  if(matchId === selectedId) {
   return curr.stateName;
  }
  return acc;
}, DEFAULT_STATE_MSG)
}
