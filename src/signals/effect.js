import List from "../types/list.js";
import Reactive from "./reactive.js";
/**@import {Ticket} from "./reactive.js";*/


/**
 * @template T
 * @extends {Reactive<T>}
 */
export default class Effect extends Reactive {
      /**
       * @type {List<{ ticket: Ticket, dependency: Reactive<unknown> }>}
       */
      #deps = new List();
      /**
       * @type {() => T}
       */
      #mapper;
      #setter = () => {
            this.apply(this.#mapper());
      }
      /**
       * 
       * @param {() => T} mapper 
       * @param {...Reactive<unknown>} deps 
       */
      constructor(mapper, ...deps) {
            super();

            this.apply(mapper());
            this.#mapper = mapper;

            for (let i = 0; i < deps.length; i++) {
                  const ticket = deps[i].subscribe(this.#setter);
                  this.#deps.push({
                        ticket,
                        dependency: deps[i],
                  });
            }
      }     
}