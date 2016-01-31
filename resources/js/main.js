//markdown compiler to pimp out (href->v-link)
//var marked = require('marked');

<<<<<<< HEAD
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




//Should we delete it ?
var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + '><a name="' +
                escapedText +
                 '" class="anchor" href="#' +
                 escapedText +
                 '"><span class="header-link"></span></a>' +
                  text + '</h' + level + '>';
},

renderer.link = function ( lien, titre, texte ) {
  var title = "";
  console.log(titre);
  if (titre != null){title = " title="+titre;}
  return '<a href="' + lien +'"' + title +">"+texte+"</a>";

}

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});


Vue.filter('markdown', function(text){
  marked(text);
})

//My Model: Data example



var poeme = {
  txt: "La terre est [bleue](www.duckduckgo.com) [comme une orange](comme_une_orange)",
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
  data:poeme,
  methods: {
    marked: marked
  }
})

console.log(notebook.marked(poeme.txt))
