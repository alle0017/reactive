import List from "../types/list.js";
/**@import {ListNode} from "../types/list.js";*/

/**
 * @template T
 * @typedef {(value: T) => void} Subscriber 
 */
/**
 * @typedef {{}} Ticket
 */
/**
 * @template T
 * @abstract
 */
export default class Reactive {
      /**
       * @type {List<Subscriber<T>>}
       */
      #subs = new List();
      /**
       * @type {T}
       */
      #value;
      /**
       * @type {T}
       */
      get value() {
            return this.#value;
      }
      set value(val) {
            throw new Error('[Reactive] value attribute setter must be implemented')
      }
      /**
       * function used as middle representation
       * it is used to trigger all subscriptions
       * @param {Subscriber<T>} sub 
       */
      #trigger = sub => {
            sub(this.value);
      }
      /**
       * method used to apply modification to the actual
       * value
       * @protected
       * @param {T} value 
       */
      apply(value) {
            this.#value = value;
            console.log(this.#value, value)
            this.trigger();
      }
      /**
       * @param {Subscriber<T>} consumer 
       * @returns {Ticket}
       */
      subscribe(consumer) {
            return this.#subs.push(consumer);
      }
      /**
       * 
       * @param {Ticket} ticket 
       */
      unsubscribe(ticket) {
            const node = /**@type {ListNode<Subscriber<T>>} */(ticket);

            if (this.#subs.holds(node)) {
                  this.#subs.remove(node);
            }
      }     
      trigger() {
            this.#subs.forEach(this.#trigger);
      }
}