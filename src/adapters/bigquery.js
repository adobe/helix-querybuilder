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
function conjunction(predicates, type) {
  const expressions = predicates
    .map(getFilterExpression)
    .filter((e) => !!e);

  if (expressions.length > 1) {
    return `(${expressions.join(` ${type} `)})`;
  }
  return expressions.join('');
}

const filters = {
  or: (qbtree) => conjunction(qbtree.predicates, 'OR'),

  and: (qbtree) => conjunction(qbtree.predicates, 'AND'),

  property: ({ property, value, operation = 'equals' }) => {
    switch (operation) {
      case 'equals': return `${property} = "${value}"`;
      case 'not': return `${property} != "${value}"`;
      default: return 'TRUE';
    }
  },

  rangeproperty: ({
    rangeproperty, lowerBound, upperBound, lowerOperation = '>', upperOperation = '<',
  }) => {
    if (Number.isFinite(lowerBound) && Number.isFinite(upperBound)) {
      return `(${rangeproperty} ${lowerOperation} ${lowerBound} AND ${rangeproperty} ${upperOperation} ${upperBound})`;
    } else if (Number.isFinite(lowerBound)) {
      return `${rangeproperty} ${lowerOperation} ${lowerBound}`;
    } else if (Number.isFinite(upperBound)) {
      return `${rangeproperty} ${upperOperation} ${upperBound}`;
    }
    return 'TRUE';
  },
};

function defaultfilter() {
  return 'TRUE';
}

function getFilterExpression(qbtree) {
  // look up a function for the type
  const applicable = filters[qbtree._type] ? filters[qbtree._type] : defaultfilter;
  const filterexp = applicable(qbtree);

  return filterexp;
}

export function adapt(qbtree) {
  const prefix = 'SELECT * FROM (';
  const suffix = [
    ')',
    `WHERE ${getFilterExpression(qbtree)}`,
  ];

  if (Number.isInteger(qbtree.limit)) {
    suffix.push(`LIMIT ${qbtree.limit}`);
    if (Number.isInteger(qbtree.offset)) {
      suffix.push(`OFFSET ${qbtree.offset}`);
    }
  }

  return [prefix, suffix.join('\n')];
}
