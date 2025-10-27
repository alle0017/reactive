import Reactive from "./signals/reactive.js";
import Effect from "./signals/effect.js";

/**
 * @template T
 * @param {T} value 
 * @returns {Reactive<T>}
 */
export const signal = value => {
      const r = new Reactive(); 
      r.value = value; 
      return r; 
}
/**
 * @template T
 * @param {() => T} callback
 * @param {...Reactive<unknown>} deps
 * @returns {Reactive<T>}
 */
export const effect = (callback, ...deps) => new Effect(callback, false, ...deps)
/**
 * @template T
 * @param {() => T} callback
 * @param {...Reactive<unknown>} deps
 * @returns {Reactive<T>}
 */
export const computed = (callback, ...deps) => new Effect(callback, true, ...deps)