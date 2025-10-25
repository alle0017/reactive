import { _toString, append, createList, createNode, join, remove } from "../types/list.js";
/**@import { List, ListNode } from "../types/list.js";*/
/**@typedef {{}} Ticket */

/**
 * @template T
 */
export default class Reactive {
      static id = 0;
      id = Reactive.id++;
      #visited = false;
      /**
       * @type {List<Reactive<unknown>>}
       */
      #deps = createList();
      /**
       * @type {T}
       * @protected
       */
      $value;

      get value() {
            return this.$value;
      }
      set value(value) {
            this.$value = value;
            this.notify();
      }

      /**
       * @protected
       */
      refresh() {

      }
      /**
       * @protected
       */
      notify() {
            /**@type {List<Reactive<unknown>>} */
            const dependencies = createList();
            join(dependencies, this.#deps);
            let curr = dependencies.head;

            while (curr) {
                  const dep = curr.value;

                  if (!dep.#visited) {
                        dep.#visited = true;
                        join(dependencies, dep.#deps);
                  }
                  
                  dep.refresh();
                  curr = curr.next;
            }
            curr = dependencies.head;

            while (curr) {
                  curr.value.#visited = false;

                  if (curr.value.#deps.tail) {
                        curr.value.#deps.tail.next = null;
                  }
                  
                  curr = curr.next;
            }
      }

      /**
       * 
       * @param {Reactive<unknown>} reactive 
       * @returns {Ticket}
       */
      subscribe(reactive) {
            const node = createNode(reactive);
            append(node, this.#deps);
            return node;
      }
      /**
       * 
       * @param {Ticket} ticket
       */
      unsubscribe(ticket) {
            remove(/**@type {ListNode<Reactive<unknown>>}*/(ticket), this.#deps);
      }
}