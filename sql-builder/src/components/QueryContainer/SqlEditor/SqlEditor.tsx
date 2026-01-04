import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import './SqlEditor.scss'

@Component({ name: 'SqlEditor' })
class SqlEditor extends Vue {
    private readonly EVENT_RUN_QUERY: string = 'runQuery'
  
    @Prop({ type: String, default: '' })
    readonly value: string

    @Prop({ type: String, default: '' })
    readonly error: string

    private content = ''

    mounted (): void {
        this.content = this.value
    }

    render (): VNode {
        return (
            <div class="sql-editor">
                <div class="editor-toolbar">
                    <span class="editor-title">SQL</span>
                    <button class="run-query" onClick={this.onClick}>
                        Run Query
                    </button>
                </div>
                <textarea
                    class="input"
                    value={this.content}
                    onInput={this.onInput}
                    placeholder="SELECT * FROM users;"
                />

                {this.error && (
                    <div class="error-message">{this.error}</div>
                )}
            </div>
        )
    }

    private onInput (e: Event): void {
        const val = (e.target as HTMLTextAreaElement).value
        this.content = val
        this.$emit('input', val)
    }

    private onClick (): void {
        this.$emit(this.EVENT_RUN_QUERY)
    }
}

export { SqlEditor }