import { bench, boxplot, run } from 'npm:mitata';
import { computed, effect, signal } from '../src/index.js';
import Reactive from '../src/signals/reactive.js';

boxplot(() => {
	bench('propagate: $w * $h', function* (state) {
		const w = state.get('w');
		const h = state.get('h');
		const src = signal(1);
		for (let i = 0; i < w; i++) {
			/**
			 * @type {Reactive<number>}
			 */
			let last = src;
			for (let j = 0; j < h; j++) {
				const prev = last;
				last = computed(() => prev.value + 1, prev);
			}
			effect(() => last.value, last);
		}
		yield () => src.value = src.value + 1;
	})
		.args('h', [1, 10, 100])
		.args('w', [1, 10, 100]);
});

run({ format: 'markdown' });