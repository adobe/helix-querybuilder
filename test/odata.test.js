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
import { load } from 'js-yaml';
import { qb } from '../src/index.js';

function assertQuery(yaml, expectedQptions) {
  const options = qb.odata(load(yaml));
  assert.deepEqual(options, expectedQptions);
}

describe('OData tests', () => {
  it('Null query works', () => {
    assertQuery('', {
      $filter: undefined,
      $skip: undefined,
      $top: undefined,
      search: '',
    });
  });

  it('Simple query works', () => {
    assertQuery(`
property:
    _: foo
    value: bar
p:
  limit: 10
  offset: 20
    `, {
      $filter: "foo eq 'bar'",
      $skip: 20,
      $top: 10,
      search: '',
    });
  });

  it('Invalid query works', () => {
    assertQuery(`
and:
  - property:
      _: foo
      value: bar
      operation: unsupported
  - rangeproperty:
      _: baz
p:
  limit: 10
  offset: 20
    `, {
      $filter: '',
      $skip: 20,
      $top: 10,
      search: '',
    });
  });

  it('Range query works with both upper and lower bounds', () => {
    assertQuery(`
and:
  - property:
      _: foo
      value: bar
      operation: not
  - rangeproperty:
      _: baz
      lowerBound: 0
      upperBound: 100
      lowerOperation: ">="
      upperOperation: "<="
p:
  limit: 10
  offset: 20
    `, {
      $filter: "(foo ne 'bar' and (baz ge 0 and baz le 100))",
      $skip: 20,
      $top: 10,
      search: '',
    });
  });

  it('Range query works', () => {
    assertQuery(`
and:
  - property:
      _: foo
      value: bar
  - rangeproperty:
      _: baz
      lowerBound: 0
      upperBound: 100
p:
  limit: 10
  offset: 20
    `, {
      $filter: "(foo eq 'bar' and (baz gt 0 and baz lt 100))",
      $skip: 20,
      $top: 10,
      search: '',
    });
  });

  it('OR works', () => {
    assertQuery(`
or:
  - rangeproperty:
      _: foo
      lowerBound: 0
  - rangeproperty:
      _: baz
      upperBound: 100
p:
  limit: 10
  offset: 20
    `, {
      $filter: '(foo gt 0 or baz lt 100)',
      $skip: 20,
      $top: 10,
      search: '',
    });
  });
});
