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
import { unnest } from '../src/loaders/json.js';
import { qb } from '../src/index.js';

function assertQuery(yaml, pairs) {
  assert.deepEqual(unnest(safeLoad(yaml)), pairs.split('\n').filter((e) => !!e).map((e) => e.split('=')));
}

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

describe('JSON loader tests', () => {
  it('Lists get prefixes', () => {
    const res = unnest([{
      property: {
        property: 'foo',
        value: 'bar',
      },
    }, {
      property: {
        property: 'baz',
        value: 'bar',
      },
    }]);

    assert.deepStrictEqual(res, [
      ['1_property.property', 'foo'],
      ['1_property.value', 'bar'],
      ['2_property.property', 'baz'],
      ['2_property.value', 'bar'],
    ]);
  });

  it('and becomes a group', () => {
    const res = unnest({
      and: [{
        property: {
          property: 'foo',
          value: 'bar',
        },
      }, {
        property: {
          property: 'baz',
          value: 'bar',
        },
      }],
    });

    assert.deepStrictEqual(res, [
      ['group.1_property.property', 'foo'],
      ['group.1_property.value', 'bar'],
      ['group.2_property.property', 'baz'],
      ['group.2_property.value', 'bar'],
      ['group.p.or', false],
    ]);
  });

  it('or becomes a group', () => {
    const res = unnest({
      or: [{
        property: {
          property: 'foo',
          value: 'bar',
        },
      }, {
        property: {
          property: 'baz',
          value: 'bar',
        },
      }],
    });

    assert.deepStrictEqual(res, [
      ['group.1_property.property', 'foo'],
      ['group.1_property.value', 'bar'],
      ['group.2_property.property', 'baz'],
      ['group.2_property.value', 'bar'],
      ['group.p.or', true],
    ]);
  });

  const examples = [[`
property:
  property: foo
  value: bar
`, `
property.property=foo
property.value=bar
`]];

  examples.forEach(([yaml, qbl], i) => it(`Misc Test (${i})`, () => assertQuery(yaml, qbl)));
});
