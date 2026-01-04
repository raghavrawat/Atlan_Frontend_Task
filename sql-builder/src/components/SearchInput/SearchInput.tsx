import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import './SearchInput.scss'

@Component({ name: 'SearchInput' })
class SearchInput extends Vue {
  private readonly EVENT_INPUT = 'input'
  private readonly EVENT_CLEAR = 'clear'

  @Prop({ type: String, default: '' })
  readonly value: string

  @Prop({ type: String, default: 'Search...' })
  readonly placeholder: string

  render (): VNode {
    return (
      <div class="search-input">
        <input
          type="text"
          class="search-input-field"
          value={this.value}
          placeholder={this.placeholder}
          onInput={this.handleInput}
        />

        {this.value && (
          <button
            class="search-clear-btn"
            onClick={this.handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    )
  }

  private handleInput (e: Event): void {
    this.$emit(this.EVENT_INPUT, (e.target as HTMLInputElement).value)
  }

  private handleClear (): void {
    this.$emit(this.EVENT_INPUT, '')
    this.$emit(this.EVENT_CLEAR)
  }
}

export { SearchInput }