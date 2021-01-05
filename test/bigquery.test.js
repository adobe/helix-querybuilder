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

function assertQuery(yaml, expectedQuery) {
  const [prefix, suffix] = qb.bigquery(load(yaml));
  assert.equal(`${prefix}SELECT * FROM visits${suffix}`, expectedQuery);
}

describe('BigQuery tests', () => {
  it('Null query works', () => {
    assertQuery('', `SELECT * FROM (SELECT * FROM visits)
WHERE TRUE`);
  });

  it('Simple query works', () => {
    assertQuery(`
property:
    _: foo
    value: bar
p:
  limit: 10
  offset: 20
`, `SELECT * FROM (SELECT * FROM visits)
WHERE foo = "bar"
LIMIT 10
OFFSET 20`);
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
`, `SELECT * FROM (SELECT * FROM visits)
WHERE (TRUE AND TRUE)
LIMIT 10`);
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
`, `SELECT * FROM (SELECT * FROM visits)
WHERE (foo != "bar" AND (baz >= 0 AND baz <= 100))
LIMIT 10
OFFSET 20`);
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
`, `SELECT * FROM (SELECT * FROM visits)
WHERE (foo = "bar" AND (baz > 0 AND baz < 100))
LIMIT 10
OFFSET 20`);
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
`, `SELECT * FROM (SELECT * FROM visits)
WHERE (foo > 0 OR baz < 100)
LIMIT 10
OFFSET 20`);
  });
});
