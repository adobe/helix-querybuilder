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

function assertQuery(yaml, expectedQuery, expectedQptions) {
  const [query, options] = qb.algolia(safeLoad(yaml));
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
      filters: `(foo:'bar')`,
    });
  });
});
