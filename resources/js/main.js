//markdown compiler to pimp out (href->v-link)
var marked = require('marked');

//My Model: Data example

var data = {
  txt: "La terre est [bleue] [comme une orange]"
  links: {
    bleue: {
      txt: "couleur primaire"
    }
    comme_une_orange: {
      txt: "le fruit rond"
    }
  }
} 


// create a Vue instance, or, a "ViewModel"
// which links the View and the Model
var notebook = new Vue({
  el: '#notebook',
  data: data
})
