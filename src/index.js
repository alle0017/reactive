import Signal from "./signals/signal.js";
import Effect from "./signals/effect.js";

export const signal = value => new Signal(value);
export const effect = (callback, ...deps) => new Effect(callback, ...deps)
export const computed = (callback, ...deps) => new Effect(callback, ...deps)

const s = signal(0);

effect(() => console.log(s.value), s)

s.value++;
s.value++