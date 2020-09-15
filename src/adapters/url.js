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
/* eslint-disable no-use-before-define, no-underscore-dangle */

export function adapt(qbtree, prefix = '', params = new URLSearchParams(), nested = '') {
  if (qbtree._type === 'and' || qbtree._type === 'or') {
    params.append(`${prefix + nested}group.p.or`, qbtree._type === 'or');
    qbtree.predicates.forEach((predicate, i) => {
      adapt(predicate, prefix, params, `${nested}group.${i + 1}_`);
    });

    Object.entries(qbtree)
      .filter(([key]) => key !== '_type')
      .filter(([key]) => key !== 'predicates')
      .forEach(([key, value]) => {
        params.append(`${`${prefix + nested}p`}.${key}`, value);
      });
  } else {
    Object.entries(qbtree)
      .filter(([key]) => key !== '_type')
      .forEach(([key, value]) => {
        params.append(`${prefix + nested + qbtree._type}.${key}`, value);
      });
  }

  return params;
}
