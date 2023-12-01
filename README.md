# Restart Animations Element

A custom element for restarting animations on the page or for another
element. This only works for animations that persist.

## Usage

Here’s how to get it into your document and a few ways you can define it:

```js
import { RestartAnimationsElement } from "https://esm.sh/gh/knowler/restart-animations-element/restart-animations-element.js?raw";

// 1. Use the static method. Defines element `<restart-animations>`
RestartAnimationsElement.define();

// 2. Set a custom tag name.
RestartAnimationsElement.define("replay-animations");

// 3. The standard way
if (!window.customElements.get("restart-animations")) {
	window.customElements.define("restart-animations", RestartAnimationsElement);
}
```

Here’s how to use it:

```html
<restart-animations></restart-animations>
```

That’ll effectively display this:

```html
<button type="button">Restart Animations</button>
```

## Scoping to a specific element

By default, the button will restart the animations for the entire page.
You can provide the `for` attribute an element ID to scope this to just
that element and it’s descedants.

```html
<restart-animations for="my-animated-element"></restart-animations>

<figure id="my-animated-element"><!-- ... --></figure>
```

## Customize

This element has two slots:

1. The unnamed slot which is used to set the text of the button. You can
	 override it like this:
	 ```html
	 <restart-animations>Replay Animations</restart-animations>
	 ```
2. The `button` slot. This allows you to provide your own button.
	 ```html
	 <restart-animations>
		 <button slot="button" type="button">Replay Animations</button>
	 </restart-animations>
	 ```

The default button is exposed with CSS Parts and you can style it like
this:

```css
restart-animations::part(button) {
	font-family: Comic Sans MS;
	color: DeepPink;
}
```
