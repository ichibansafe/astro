type ButtonSize = 'small' | 'medium' | 'large';
type ButtonStyle = 'ghost' | 'outline' | 'purple' | 'gray' | 'red' | 'green' | 'yellow';

export class DevToolbarButton extends HTMLElement {
	_size: ButtonSize = 'small';
	_buttonStyle: ButtonStyle = 'purple';

	get size() {
		return this._size;
	}

	set size(value) {
		this._size = value;
		this.updateStyle();
	}

	get buttonStyle() {
		return this._buttonStyle;
	}

	set buttonStyle(value) {
		this._buttonStyle = value;
		this.updateStyle();
	}

	static observedAttributes = ['button-style', 'size'];

	shadowRoot: ShadowRoot;

	constructor() {
		super();
		this.shadowRoot = this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<style>
				button {
					--purple-background: rgba(113, 24, 226, 1);
					--purple-border: rgba(224, 204, 250, 0.33);
					--purple-text: #fff;

					--gray-background: rgba(52, 56, 65, 1);
					--gray-border: rgba(71, 78, 94, 1);
					--gray-text: #fff;

					--red-background: rgba(179, 62, 102, 1);
					--red-border: rgba(249, 196, 215, 0.33);
					--red-text: #fff;

					--green-background: rgba(213, 249, 196, 1);
					--green-border: rgba(61, 125, 31, 1);
					--green-text: #000;

					--yellow-background: rgba(255, 236, 179, 1);
					--yellow-border: rgba(255, 191, 0, 1);
					--yellow-text: #000;

					--outline-background: transparent;
					--outline-border: #fff;
					--outline-text: #fff;

					--ghost-background: transparent;
					--ghost-border: transparent;
					--ghost-text: #fff;

					--large-font-size: 16px;
					--medium-font-size: 14px;
					--small-font-size: 12px;

					--large-padding: 12px 16px;
					--medium-padding: 8px 12px;
					--small-padding: 4px 8px;

					border: 1px solid var(--border);
					padding: var(--padding);
					font-size: var(--font-size);
					background: var(--background);

					color: var(--text-color);
					border-radius: 4px;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				button:hover {
					cursor: pointer;
				}

				/* TODO: Remove "astro-dev-overlay-icon" in Astro 5.0 */
				::slotted(astro-dev-overlay-icon),
				::slotted(astro-dev-toolbar-icon) {
					display: inline-block;
					height: 1em;
					width: 1em;
					margin-left: 0.5em;
				}
			</style>
			<style id="selected-style"></style>

			<button>
				<slot></slot>
			</button>
		`;
	}

	connectedCallback() {
		this.updateStyle();
	}

	updateStyle() {
		const style = this.shadowRoot.getElementById('selected-style') as HTMLStyleElement;

		style.innerHTML = `
			button {
				--background: var(--${this.buttonStyle}-background);
				--border: var(--${this.buttonStyle}-border);
				--font-size: var(--${this.size}-font-size);
				--padding: var(--${this.size}-padding);
				--text-color: var(--${this.buttonStyle}-text);
			}
		`;
	}

	attributeChangedCallback() {
		if (this.hasAttribute('size')) this.size = this.getAttribute('size') as ButtonSize;

		if (this.hasAttribute('button-style'))
			this.buttonStyle = this.getAttribute('button-style') as ButtonStyle;
	}
}
