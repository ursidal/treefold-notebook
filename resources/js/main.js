//markdown compiler to pimp out (href->v-link)
//var marked = require('marked');

var configdb = new PouchDB('treefold-config');

function initDb(){}
  configdb.get('config').catch(function (err) {
  if (err.status === 404) { // not found!
    return {
      _id: 'config',
      namedb: 'treefold-notebook',
      urldb: ''
    };
  } else { // hm, some other error
    throw err;
  }
}).then(function (configDoc) {
  var db = new PouchDB(namedb);
  if(urldb!=''){
    var remotedb = new Pouchdb(urldb+"/"+namedb);
    db.sync(remoteDb, {live: true});
  }
  else {
    var remotedb = false;
  }
  db.changes({
    since: 'now',
    live: true
  }).on('change', updateList);
}).catch(function (err) {
  console.log("Voici l'erreur lors de l'initialisation: "+err);
});





//My Model: Data example



var poeme = {
  txt: "La terre est [bleue] [comme une orange]",
  //links: {
    // bleue: {
    //   txt: "couleur primaire"
    // },
    // comme_une_orange: {
    //   txt: "le fruit rond"
    // }
  //}
}

// create a Vue instance, or, a "ViewModel"
// which links the View and the Model
var notebook = new Vue({
  el: '#elt',
  data: {
    txt: "La *terre* est [bleue] [comme une orange]"
  },
  methods: {
    marked: marked
  }
})
console.log(notebook.marked(poeme.txt))
