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

function assertQuery(yaml, expectedQuery, expectedQptions) {
  const [query, options] = qb.algolia(load(yaml));
  assert.equal(query, expectedQuery);
  assert.deepEqual(options, expectedQptions);
}

describe('Algolia tests', () => {
  it('Null query works', () => {
    assertQuery('', '', {
      hitsPerPage: 100,
      page: 1,
      filters: null,
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
    `, '', {
      hitsPerPage: 10,
      page: 3,
      filters: 'foo:\'bar\'',
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
    `, '', {
      hitsPerPage: 10,
      page: 3,
      filters: '',
    });
  });

  it('Range query works with TO', () => {
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
    `, '', {
      hitsPerPage: 10,
      page: 3,
      filters: '(NOT foo:\'bar\' AND baz: 0 TO 100)',
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
    `, '', {
      hitsPerPage: 10,
      page: 3,
      filters: '(foo:\'bar\' AND baz < 100 AND baz > 0)',
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
    `, '', {
      hitsPerPage: 10,
      page: 3,
      filters: '(foo > 0 OR baz < 100)',
    });
  });
});
