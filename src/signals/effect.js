import { append, createList, createNode, } from "../types/list.js";
import Reactive from "./reactive.js";
/**@import {Ticket} from "./reactive.js";*/
/**@import { List } from "../types/list.js"; */

/**
 * @template T
 * @extends {Reactive<T>}
 */
export default class Effect extends Reactive {
      /**
       * @type {List<{
       *    ticket: Ticket,
       *    subscriber: Reactive<unknown>
       * }>}
       */
      #tickets = createList();
      /**
       * @type {() => T}
       */
      #mapper;
      #dirty = true;

      get value() {
            if (this.#dirty) {
                  this.$value = this.#mapper();
                  this.#dirty = false;
            }
            return this.$value;
      }
      set value(value) {
            throw new Error('accessor of effects is readonly');
      }
      /**
       * 
       * @param {() => T} mapper 
       * @param  {...Reactive<unknown>} deps 
       */
      constructor(mapper, ...deps) {
            super();
            this.#mapper = mapper;
            for (let i = 0; i < deps.length; i++) {
                  append(
                        createNode({
                              ticket: deps[i].subscribe(this),
                              subscriber: deps[i]
                        }),
                        this.#tickets
                  );
            }
      }

      refresh() {
            this.#dirty = true;
      }

      drop() {
            let curr = this.#tickets.head;
            
            while (curr) {
                  curr.value.subscriber.unsubscribe(curr.value.ticket);
                  curr = curr.next;
            }
      }
}