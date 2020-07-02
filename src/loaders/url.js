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
/* eslint-disable no-underscore-dangle, no-param-reassign */
import { nest, cast } from '../util.js';

/**
 * Loads a URL query string
 * @param {string} str the URL query string (may start with `?`)
 * @param {string} prefix the prefix used for parameters that should be considered
 * @returns {object} Query Builder AST
 */
function load(str, prefix = '') {
  const obj = cast(new URLSearchParams(str));

  return nest(Object.entries(obj).reduce((o, [k, v]) => {
    if (k.startsWith(prefix)) {
      // eslint-disable-next-line no-param-reassign
      o[k.replace(prefix, '')] = v;
    }
    return o;
  }, {}));
}

export { load };
