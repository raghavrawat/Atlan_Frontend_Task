import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'

import './Header.scss'

@Component({ name: 'Header' })
class Header extends Vue {
    private readonly EVENT_NEW_QUERY: string = 'newQuery'
    render (): VNode {
        return (
             <div class="navigation-header">
                <img class="atlan-icon" src="atlan.svg" />
                <button class="new-query" onClick={() => this.$emit(this.EVENT_NEW_QUERY)}>+ New Query</button>
            </div>
        )
    }
}

export { Header }