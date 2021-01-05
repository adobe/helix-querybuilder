# Helix Querybuilder

> AEM Querybuilder for JavaScript (Browser, Node, Deno)

## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-querybuilder.svg)](https://codecov.io/gh/adobe/helix-querybuilder)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-querybuilder.svg)](https://circleci.com/gh/adobe/helix-querybuilder)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-querybuilder.svg)](https://github.com/adobe/helix-querybuilder/blob/main/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-querybuilder.svg)](https://github.com/adobe/helix-querybuilder/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/helix-querybuilder.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/helix-querybuilder)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```bash
$ npm install @adobe/helix-querybuilder
```
## Background

The [AEM QueryBuilder](https://docs.adobe.com/content/help/en/experience-manager-65/developing/platform/query-builder/querybuilder-api.html) is a Java and REST API for executing server-side queries using a custom Query Builder Language (QBL). QBL was designed to be:

1. implementation agnostic
2. HTML-form friendly (you should not need JavaScript to build a query)
3. simple (no joins or projections)

## QBL Language and Notation

### As URL Query String

The most common way of expressing queries is as a query string appended to the URL of the resource that is able to execute queries. In the context of Project Helix, this would be the [Helix Data Embed Action](https://github.com/adobe/helix-data-embed#filtering-results).

An example query might look like this:

```
https://adobeioruntime.net/api/v1/web/helix/helix-services/data-embed@v1/https://blogs.adobe.com/psirt/?feed=atom&hlx_property=author&hlx_property.value=svishnoi
```

The query is encoded in the URL parameters `hlx_property=author&hlx_property.value=svishnoi`.

### As a multi-line text

This URL query string notation is most practical in day-to-day use, but a bit hard to read. Therefore a multi-line text notation is used that uses line breaks to separate key-value-pairs, does not use prefixes, nor URL-encoding:

```
property=author
property.value=svishnoi
```

### As JSON or YAML

When using QBL in configuration files or JavaScript applications, it can be convenient to represent QBL in JSON like this:

```json
{
  "property": {
    "property": "author",
    "value": "svishnoi"
  }
}
```

or as YAML like:

```yaml
property:
  property: author
  value: svishnoi
```

In the following examples the multi-line and YAML notation will be used.

Of course, repeating the name of the predicate is boring and tedious, so the short-hand `_` can be used instead of the inner repetition of the predicate name:

```json
{
  "property": {
    "_": "author",
    "value": "svishnoi"
  }
}
```

or as YAML like:

```yaml
property:
  _: author
  value: svishnoi
```

## Usage

### Simple Usage

```javascript
import { qb } from '@adobe/querybuilder';

const filter = qb.filter(window.location.search);
const filtered = filter(dataarray);
```

### Loading from JSON to create a filter

```javascript
// other loaders are availale, e.g. text and url
import { load } from '@adobe/querybuilder/src/loaders/json.js'
// other adapters will be made available soon
import { adapt } from '@adobe/querybuilder/src/adapters/filter.js'

const qb = load(JSON.parse(input));
const filter = adapt(qb);

filter([
  { foo: 'bar'}
]);
```

### API Reference

For more, see the [API documentation](docs/API.md).

### Other Adapters

- `filter` creates a function that filters an in-memory array
- `algolia` returns a pair of search string and options that can be used with `algoliasearch`
- `odata` creates an OData filter object that can be used with Azure cognitive search or Excel

## Development

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```

## Developing Loaders

A loader must implement and export a `load` function that accepts a Query Builder Language representation in any form and returns a Query Builder AST object.

If you have the QBL as key-value pairs, then you can use  [`{ nest } from '@adobe/querybuilder/src/utils.js'`](./docs/API.md#nest) for a quick transformation.
