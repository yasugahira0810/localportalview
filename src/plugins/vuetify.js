import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#009688',   //colors.teal.base
        secondary: '#795548', //colors.brown.base
        accent: '#03a9f4',    //colors.light-blue.base
        error: '#f44336',     //colors.red.base
        warning: '#ffc107',   //colors.amber.base
        info: '#607d8b',      //colors.blue-grey.base
        success: '#8bc34a'    //colors.light-green.base
      }
    }
  }
});
