/**
 * @template T
 * @typedef {{
 *    next: ListNode<T>
 *    value: T,
 * }} ListNode
 */
/**
 * @template T
 * @typedef {{
 *    head: ListNode<T>
 *    tail: ListNode<T>
 * }} List
 */
/**
 * @template T
 * @returns {List<T>}
 */
export function createList() {
      return {
            head: null,
            tail: null
      };
}
/**
 * @template T
 * @param {T} value 
 * @returns {ListNode<T>}
 */
export function createNode(value) {
      return {
            next: undefined,
            value,
      };
}

/**
 * @template T
 * @param {ListNode<T>} node 
 * @param {List<T>} list 
 */
export function append(node, list) {
      if (!list.head) {
            list.head = node;
            list.tail = node;
      } else {
            list.tail.next = node;
            list.tail = node;
      }
      node.next = null;
}
/**
 * @template T
 * @param {ListNode<T>} node 
 * @param {List<T>} list 
 */
export function remove(node, list) {
      if (node == list.head) {
            list.head = list.head.next;

            if (node == list.tail) {
                  list.tail = list.head;
            }
            return;
      }

      let prev = list.head;
      let curr = list.head;

      while (curr) {
            if (curr == node) {
                  prev.next = curr.next;

                  if (curr == list.tail) {
                        list.tail = prev;
                  }
            }
            prev = curr;
            curr = curr.next;
      }
}

/**
 * @template T
 * @param {List<T>} list 
 */
export function _toString(list) {
      let curr = list.head;
      let str = `{${list.head}}`;

      

      while (curr) {
            str += `(${curr.value}) -> `;
            curr = curr.next;
      }
      str += `() {${list.tail}}`;
      return str;
}
/**
 * @template T
 * @param {List<T>} list 
 * @param {List<T>} next 
 */
export function join(list, next) {
      if (!list.head) {
            list.head = next.head;
            list.tail = next.tail;
      } else {
            list.tail.next = next.head;
            list.tail = next.tail ?? list.tail;
      }
}