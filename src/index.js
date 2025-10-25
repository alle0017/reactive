import Reactive from "./signals/reactive.js";
import Effect from "./signals/effect.js";

export const signal = value => {const r = new Reactive(); r.value = value; return r; }
export const effect = (callback, ...deps) => new Effect(callback, ...deps)
export const computed = (callback, ...deps) => new Effect(callback, ...deps)