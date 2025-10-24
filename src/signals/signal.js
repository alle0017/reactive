import List from "../types/list.js";
import Reactive from "./reactive.js";
/**@import {Ticket} from "./reactive.js";*/


/**
 * @template T
 * @extends {Reactive<T>}
 */
export default class Signal extends Reactive {
      get value() {
            return super.value;
      }
      /**
       * @param {T} value
       */
      set value(value) {
            if (value === this.value && typeof value !== 'object') {
                  return;
            }
            this.apply(value);
      }
      /**
       * 
       * @param {T} initial 
       */
      constructor(initial) {
            super();
            this.value = initial;
      }     
}