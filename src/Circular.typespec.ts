
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { PLACEHOLDER, ToCircular } from './Circular'
import { Assert, IsExactType } from "typebolt";

///
/// TESTS
///

// Simple record with one level and one recursive property
{
  type Input = {
    root: PLACEHOLDER;
  };

  type Output = ToCircular<Input>;

  type Expected = { root: Expected };

  Assert<IsExactType<Output, Output["root"]>>();
  Assert<IsExactType<Expected, Output>>();
}

// If no placeholder, Input is preserved entirely
{
  type Input = {
    a: string;
    b: boolean;
    c: {
      d: number;
      e: Array<{}>;
    };
  };

  type Output = ToCircular<Input>;

  Assert<IsExactType<Output, Input>>();
}

{
  type Input = 42
  type Output = ToCircular<Input>
  Assert<IsExactType<Output, Input>>()
}

// If already a circular type, preserves type
{
  type Input = {
    root: Input;
  };

  type Output = ToCircular<Input>;

  Assert<IsExactType<Output, Input>>();
}

// Can be nested
{
  type Input = { a: { b: { c: { root: PLACEHOLDER } } } };

  type Output = ToCircular<Input>;

  type Expected = { a: { b: { c: { root: Expected } } } };

  Assert<IsExactType<Expected, Output>>();
}
