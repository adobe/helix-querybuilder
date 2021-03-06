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
import { adapt as bigquery } from './adapters/bigquery.js';
import { adapt as algolia } from './adapters/algolia.js';
import { adapt as odata } from './adapters/odata.js';
import { adapt as url } from './adapters/url.js';

/**
 * Loads a Query Builder AST from generic input: either URL query string (with &)
 * or as key-value-pairs (with line breaks) or as Object (from JSON or YAML notation)
 * @param {object|string|string[]} input QBL input
 * @returns {object} Query Builder AST
 */
function load(input) {
  if ((typeof input === 'object' && !Array.isArray(input)) || (Array.isArray(input) && input.every((e) => typeof e === 'object'))) {
    return loadjson(input);
  }
  if (typeof input === 'string' || (Array.isArray(input) && input.every((e) => typeof e === 'string'))) {
    const expr = Array.isArray(input) ? input.join('') : input;
    return expr.indexOf('\n') > 0 ? loadtext(expr) : loadquerystring(expr);
  }
  return {};
}

/**
 * Convenience function that can be used as a tagged template
 * function and returns a filter function
 * @param {string[]} strings string array as used in template literals
 * @returns {function} filter function that accepts an array and returns a filtered array
 */
const filter = (strings) => createfilter(load(strings));

const qb = {
  filter,
  bigquery: (i) => bigquery(load(i)),
  algolia: (i) => algolia(load(i)),
  odata: (i) => odata(load(i)),
  url: (i, p) => url(load(i), p),
};

export { qb, load };
