
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

export const PLACEHOLDER_TOKEN = Symbol();
export type PLACEHOLDER_TOKEN = typeof PLACEHOLDER_TOKEN;

export class PLACEHOLDER {
  readonly [PLACEHOLDER_TOKEN] = true
}

export type ToCircular<X, P = PLACEHOLDER, Root = X> = X extends {}
  ? {
      [K in keyof X]: X[K] extends P
        ? ToCircular<Root>
        : ToCircular<X[K], P, Root>;
    }
  : X;

export function Circular<T>(
  constructor: (placeholder: PLACEHOLDER) => T
): ToCircular<T> {
  function makeCircular(
    root: any,
    placeholder: PLACEHOLDER,
    currentNode = root
  ) {
    // Traverse records and arrays
    if (
      currentNode &&
      typeof currentNode === "object"
    ) {
      for (const key in currentNode) {
        // If it's marked replace key with root
        if (currentNode[key] === placeholder) {
          currentNode[key] = root;
        } else {
          makeCircular(
            root,
            placeholder,
            currentNode[key]
          );
        }
      }
    }
  }

  const p = new PLACEHOLDER()
  const x = constructor(p);
  makeCircular(x, p, x);
  return x as any;
}

export namespace Circular {
  export declare function Ref<T>(thunk: unknown): any
}
