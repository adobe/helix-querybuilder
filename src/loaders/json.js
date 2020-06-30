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

import { nest, cast } from '../util.js';

function ispair(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] === 'string' && !Array.isArray(e[1]) && typeof e[1] !== 'object'
}

function flat(arr) {
  if (arr.every(ispair)) {
    return arr;
  }
  return [].concat(...arr)
}

function unnest(obj, prefix = '') {
  if (Array.isArray(obj)) {
    const retval = obj.map((element, index) => unnest(element, `${prefix}${index + 1}_`));
    return flat(retval);
  }
  if (typeof obj === 'object') {
    const retval = Object.entries(obj).map(([key, value]) => unnest(value, `${prefix}${(key === 'and' || key === 'or' ) ? 'group' : key}.`));
    if (obj.and || obj.or) {
      retval.push([[`${prefix}group.p.or`, !!obj.or]]);
    }
    return flat(retval);
  }

  return [prefix.slice(0, -1), obj];
}

function load(json) {
  const obj = cast(unnest(json));
  return nest(obj);
}

export { load, unnest };
