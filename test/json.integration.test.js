/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-env mocha */
import assert from 'assert';
import { safeLoad } from 'js-yaml';
import { qb } from '../src/index.js';

function assertResults(yaml, input, expected) {
  const f = qb.filter(safeLoad(yaml));
  const result = f(input);
  assert.deepEqual(result, expected);
}

describe('JSON/YAML integration test', () => {
  const example = [
    { foo: 'bar' },
    { foo: 'baz' },
    { foo: 'foo' },
  ];

  it('Null filter works', () => {
    assertResults('', example, example);
  });

  it('Non filter works', () => {
    assertResults(`
property:
    property: gnu
    value: schaut zu
    operation: unequals
`, example, example);
  });

  it('Harsh filter works', () => {
    assertResults(`
property:
    property: foo
    value: schaut zu
    operation: equals
`, example, []);
  });
});
