//markdown compiler to pimp out (href->v-link)
//var marked = require('marked');

//var configdb = new PouchDB('treefold-config');
var db, remotedb;

function initDb(){
  configdb.get('config').catch(function (err) {
    if (err.status === 404) { // not found!
      return {
        _id: 'config',
        namedb: 'treefold-notebook',
        urldb: '',
        newconfig: true
      };
    } else { // hm, some other error
      throw err;
    }
  }).then(function (configDoc) {
    db = new PouchDB(configDoc.namedb);
    if(configDoc.urldb!=''){
      remotedb = new Pouchdb(configDoc.urldb+"/"+configDoc.namedb);
      db.sync(remoteDb, {live: true});
    }
    else {
      remotedb = false;
    }
    db.changes({
      since: 'now',
      live: true
    }).on('change', updateList);
    }).catch(function (err) {
    console.log("Voici l'erreur lors de l'initialisation: "+err);
  });
}

function updateList(){
  //met à jour les documents
}

function newConfig(){
  return 0;
}

function newDoc(){
  var date = (new Date()).toJSON();
  var doc = {
    _id: date,
    modified: date,
    title: "Sans titre",
    text: "",
    rev: ""
  };
  return doc;
}

function findDocById(listDocs,id){
      var i = 0;
      var n = listDocs.length;
      while(listDocs[i]._id != id && i<n){
        i=i+1;
      }
      console.log("findDocById: "+i)
      return i;
    }

//Should we delete it ?
// var renderer = new marked.Renderer();
//
// renderer.heading = function (text, level) {
//   var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
//
//   return '<h' + level + '><a name="' +
//                 escapedText +
//                  '" class="anchor" href="#' +
//                  escapedText +
//                  '"><span class="header-link"></span></a>' +
//                   text + '</h' + level + '>';
// },
//
// renderer.link = function ( lien, titre, texte ) {
//   var title = "";
//   console.log(titre);
//   if (titre != null){title = " title="+titre;}
//   return '<a href="' + lien +'"' + title +">"+texte+"</a>";
//
// }
//
// marked.setOptions({
//   renderer: renderer,
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: true,
//   smartLists: true,
//   smartypants: false
// });
//
//
// Vue.filter('markdown', function(text){
//   marked(text);
// })

//My Model: Data example



var model = {
  listDocs: [],
  config: newConfig(),
  activeDoc: null
  //txt: "La terre est [bleue](www.duckduckgo.com) [comme une orange](comme_une_orange)",
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
  data: model,
  methods: {
    //marked: marked,
    addDoc: function(){
      console.log("addDoc cliqué");
      var newdoc = newDoc();
      this.listDocs.push(newdoc);
      this.activeDoc = this.listDocs.length-1;
      console.log(this.activeDoc);
    },
    activate: function(id){
      console.log("apparemment a cliqué sur "+id)
      this.activeDoc = findDocById(this.listDocs,id);
    },
    dateModif: function(doc){
      doc.modified = (new Date()).toJSON();
    },
    findDocById: function(id){
      var i = findDocById(this.listDocs,id);
      return i;
    },
    dateShow: function(date){
      var date = new Date(date);
      return date.getDate()+"/"+date.getMonth();
    }
  }
})
