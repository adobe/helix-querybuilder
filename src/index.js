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
import { load as loadquerystring } from './loaders/url.js';
import { load as loadtext } from './loaders/text.js';
import { load as loadjson } from './loaders/json.js';
import { adapt as createfilter } from './adapters/filter.js';

function query(input) {
  if ((typeof input === 'object' && !Array.isArray(input)) || (Array.isArray(input) && input.every((e) => typeof e === 'object'))) {
    return loadjson(input);
  }
  if (typeof input === 'string' || (Array.isArray(input) && input.every((e) => typeof e === 'string'))) {
    const expr = Array.isArray(input) ? input.join('') : input;
    return expr.indexOf('\n') > 0 ? loadtext(expr) : loadquerystring(expr);
  }
  return {};
}

const filter = (strings) => createfilter(query(strings));

const qb = {
  filter,
};

export { qb, filter };
