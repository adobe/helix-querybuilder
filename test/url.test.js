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

function assertQuery(yaml, expectedQuery, prefix) {
  const url = qb.url(load(yaml), prefix);
  assert.deepEqual(url.toString(), new URLSearchParams(expectedQuery).toString());
}

describe('URL tests', () => {
  it('Null query works', () => {
    assertQuery('', '');
  });

  it('Simple query works', () => {
    assertQuery(`
property:
    _: foo
    value: bar
p:
  limit: 10
  offset: 20
`, 'group.p.or=false&group.1_property.property=foo&group.1_property.value=bar&p.limit=10&p.offset=20');
  });

  it('Simple query works with prefix', () => {
    assertQuery(`
property:
    _: foo
    value: bar
`, 'hlx_group.p.or=false&hlx_group.1_property.property=foo&hlx_group.1_property.value=bar',
    'hlx_');
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
`, 'group.p.or=false&group.1_group.p.or=false&group.1_group.1_property.property=foo&group.1_group.1_property.value=bar&group.1_group.1_property.operation=unsupported&group.1_group.2_rangeproperty.rangeproperty=baz');
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
`, 'group.p.or=false&group.1_group.p.or=false&group.1_group.1_property.property=foo&group.1_group.1_property.value=bar&group.1_group.1_property.operation=not&group.1_group.2_rangeproperty.rangeproperty=baz&group.1_group.2_rangeproperty.lowerBound=0&group.1_group.2_rangeproperty.upperBound=100&group.1_group.2_rangeproperty.lowerOperation=%3E%3D&group.1_group.2_rangeproperty.upperOperation=%3C%3D');
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
`, 'group.p.or=false&group.1_group.p.or=false&group.1_group.1_property.property=foo&group.1_group.1_property.value=bar&group.1_group.2_rangeproperty.rangeproperty=baz&group.1_group.2_rangeproperty.lowerBound=0&group.1_group.2_rangeproperty.upperBound=100');
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
`, 'group.p.or=false&group.1_group.p.or=true&group.1_group.1_rangeproperty.rangeproperty=foo&group.1_group.1_rangeproperty.lowerBound=0&group.1_group.2_rangeproperty.rangeproperty=baz&group.1_group.2_rangeproperty.upperBound=100');
  });
});
