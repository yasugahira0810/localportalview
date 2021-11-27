import Vue from 'vue';
import Router from 'vue-router';
import SearchTable from "../components/SearchTable";
import HelloWorld from "../components/HelloWorld";
import AddLink from "../components/AddLink";
import ShowLinks from "../components/ShowLinks";
import ImportLinks from "../components/ImportLinks";
import Initialize from "../components/Initialize";
import HowToUse from "../components/HowToUse";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SearchTable',
      component: SearchTable
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/AddLink',
      name: 'AddLink',
      component: AddLink
    },
    {
      path: '/ShowLinks',
      name: 'ShowLinks',
      component: ShowLinks
    },
    {
      path: '/ImportLinks',
      name: 'ImportLinks',
      component: ImportLinks
    },
    {
      path: '/Initialize',
      name: 'Initialize',
      component: Initialize
    },
    {
      path: '/HowToUse',
      name: 'HowToUse',
      component: HowToUse
    }
  ]
});