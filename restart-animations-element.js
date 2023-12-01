const restartAnimationsElementStyleSheet = new CSSStyleSheet();

await restartAnimationsElementStyleSheet.replace(`
	:host { display: inline-block; }
`);

export class RestartAnimationsElement extends HTMLElement {
	get #buttonSlot() {
		return this.shadowRoot.querySelector("slot[name=button]");
	}

	get #buttonElement() {
		const [slottedButton] = this.#buttonSlot.assignedElements();

		return slottedButton ?? this.shadowRoot.querySelector("button[part=button]");
	}

	get #forElement() {
		return this.htmlFor ? this.ownerDocument.getElementById(this.htmlFor) : this.ownerDocument;
	}

	get htmlFor() {
		return this.getAttribute("for");
	}

	set htmlFor(id) {
		this.setAttribute("id", id);
	}

	connectedCallback() {
		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" });
			this.shadowRoot.adoptedStyleSheets = [restartAnimationsElementStyleSheet];
			this.shadowRoot.innerHTML = `
				<slot name="button">
					<button type="button" part="button">
						<slot>Restart Animations</slot>
					</button>
				</slot>
			`;
		}

		this.#buttonElement.addEventListener("click", this);
	}

	handleEvent(event) {
		if (event.type === "click") {
			for (const animation of this.#forElement.getAnimations({ subtree: true })) {
				animation.cancel();
				animation.play();
			}
		}
	}

	static define(tagName = "restart-animations") {
		if (!window.customElements.get(tagName)) {
			window[this.name] = this;
			window.customElements.define(tagName, this);
		}
	}
}
