/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { nest, toKVPairs } from '../util.js';
/**
 * Loads a multiline QBL expression
 * @param {string} txt the QBL expression (may contain blank lines)
 * @returns {object} Query Builder AST
 */
function load(txt) {
  const pairs = txt
    .split('\n')
    .map((l) => {
      const [key, ...rest] = l.split('=');
      // the rest can contain = signs, so we turn it back into a string
      return [key, rest.join('=')];
    })
    .filter(([k]) => !!k);

  return nest(toKVPairs(pairs));
}

export { load };
