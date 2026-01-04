import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'

import { QueryBuidlerView } from './views/QueryBuilderView/QueryBuilderView'

import './App.scss'

@Component({ name: 'App' })
export default class App extends Vue {
    render (): VNode {
        return (
            <QueryBuidlerView />   
        )
    }
}