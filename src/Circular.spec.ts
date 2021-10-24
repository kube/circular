
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Assert, IsExactType } from "typebolt";
import { Circular } from "./Circular";

it("creates circular objects", () => {
  const picsou = Circular((self) => ({
    name: "Picsou",
    bestFriend: self,
  }));

  type Expected = {
    name: string;
    bestFriend: Expected;
  };

  expect(picsou.name).toBe("Picsou");
  expect(picsou.bestFriend).toBe(picsou);

  Assert<IsExactType<Expected, typeof picsou>>();
});

{
  const john = Circular((john) => ({
    name: "John",
    bestFriend: {
      name: "Bob",
      bestFriend: john,
    },
  }));

  type Result = {
    name: string;    
    bestFriend: {
      name: string;
      bestFriend: Result;
    };
  };

  Assert<IsExactType<typeof john, Result>>();
  Assert<IsExactType<typeof john, typeof john.bestFriend.bestFriend>>();
}

// {
//   const a = Circular(a => ({
//     b: Circular(b => ({
//       a,
//       c: { a, b }
//     }))
//   }))

//   type A = {
//     b: {
//       a: A,
//       c: {
//         a: A,
//         b: A['b']
//       }
//     }
//   }

//   Assert<IsExactType<typeof a, A>>()
//   Assert<IsExactType<typeof a['b']['c']['b'], typeof a['b']>>()
//   Assert<IsExactType<typeof a['b']['c']['a'], typeof a>>()
// }

{
  const a = Circular(a => ({
    a,
    b: Circular.Ref(() => b)
  }))

  const b = Circular(b => ({
    a,
    b,
  }))

  // Use Axcessor 

  Circular 
}
