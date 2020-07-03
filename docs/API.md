## Functions

<dl>
<dt><a href="#load">load(input)</a> ⇒ <code>object</code></dt>
<dd><p>Loads a Query Builder AST from generic input: either URL query string (with &amp;)
or as key-value-pairs (with line breaks) or as Object (from JSON or YAML notation)</p>
</dd>
<dt><a href="#filter">filter(strings)</a> ⇒ <code>function</code></dt>
<dd><p>Convenience function that can be used as a tagged template
function and returns a filter function</p>
</dd>
<dt><a href="#unique">unique(arr, key)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Adds items to an array while ensuring there are no
duplicate elements in the array. Can be used ao a
reducer.</p>
</dd>
<dt><a href="#flat">flat(flattened, e)</a> ⇒ <code>array</code></dt>
<dd><p>A reducer function that flattens an array of array.
Flattens only one level.</p>
</dd>
<dt><a href="#transformConjunctions">transformConjunctions(qbtree)</a> ⇒ <code>object</code></dt>
<dd><p>Transforms a Query Builder AST that has implicit conjunctions
into one with explicit conjunctions.</p>
<p>The transformation rules are:</p>
<ul>
<li>predicates of the same type and property form a union (and)</li>
<li>predicates of different types form an intersection (or)</li>
</ul>
</dd>
<dt><a href="#nest">nest(obj)</a> ⇒ <code>object</code></dt>
<dd><p>Turns a flat list of key-value-pairs into a nested Query Builder
AST.</p>
</dd>
<dt><a href="#cast">cast(searchparams)</a> ⇒ <code>object</code></dt>
<dd><p>Turns URL parameters into key-value pairs. Assigns type
to boolean and number values.</p>
</dd>
<dt><a href="#ispair">ispair(e)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the argument is a pair (array with two elements, the first
must be a string)</p>
</dd>
<dt><a href="#flat">flat(arr)</a> ⇒ <code>array</code></dt>
<dd><p>Flattens arrays of arrays (only one level) so that
an array af pairs remains</p>
</dd>
<dt><a href="#unnest">unnest(obj, prefix)</a> ⇒ <code>Array</code></dt>
<dd><p>Turns a nested QBL in JSON notation into a list of
key-value-pairs. Recursively descends into each object
and carries the correct prefix string</p>
</dd>
<dt><a href="#load">load(json)</a> ⇒ <code>object</code></dt>
<dd><p>Loads a QBL in JSON notation</p>
</dd>
<dt><a href="#load">load(txt)</a> ⇒ <code>object</code></dt>
<dd><p>Loads a multiline QBL expression</p>
</dd>
<dt><a href="#load">load(str, prefix)</a> ⇒ <code>object</code></dt>
<dd><p>Loads a URL query string</p>
</dd>
</dl>

<a name="load"></a>

## load(input) ⇒ <code>object</code>
Loads a Query Builder AST from generic input: either URL query string (with &)
or as key-value-pairs (with line breaks) or as Object (from JSON or YAML notation)

**Kind**: global function  
**Returns**: <code>object</code> - Query Builder AST  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>object</code> \| <code>string</code> \| <code>Array.&lt;string&gt;</code> | QBL input |

<a name="filter"></a>

## filter(strings) ⇒ <code>function</code>
Convenience function that can be used as a tagged template
function and returns a filter function

**Kind**: global function  
**Returns**: <code>function</code> - filter function that accepts an array and returns a filtered array  

| Param | Type | Description |
| --- | --- | --- |
| strings | <code>Array.&lt;string&gt;</code> | string array as used in template literals |

<a name="unique"></a>

## unique(arr, key) ⇒ <code>Array.&lt;string&gt;</code>
Adds items to an array while ensuring there are no
duplicate elements in the array. Can be used ao a
reducer.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - the same array with unique entries  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;string&gt;</code> | an array of strings |
| key | <code>string</code> | a string that should occur only once in the arrav |

<a name="flat"></a>

## flat(flattened, e) ⇒ <code>array</code>
A reducer function that flattens an array of array.
Flattens only one level.

**Kind**: global function  
**Returns**: <code>array</code> - a flattened array  

| Param | Type | Description |
| --- | --- | --- |
| flattened | <code>array</code> | the flattened array |
| e | <code>array</code> | a new array to flatten |

<a name="transformConjunctions"></a>

## transformConjunctions(qbtree) ⇒ <code>object</code>
Transforms a Query Builder AST that has implicit conjunctions
into one with explicit conjunctions.

The transformation rules are:
- predicates of the same type and property form a union (and)
- predicates of different types form an intersection (or)

**Kind**: global function  
**Returns**: <code>object</code> - Query Builder AST with explicit conjunctions  

| Param | Type | Description |
| --- | --- | --- |
| qbtree | <code>object</code> | Query Builder AST |

<a name="nest"></a>

## nest(obj) ⇒ <code>object</code>
Turns a flat list of key-value-pairs into a nested Query Builder
AST.

**Kind**: global function  
**Returns**: <code>object</code> - a Query Builder AST  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Query Builder expressions as key-value pairs |

<a name="cast"></a>

## cast(searchparams) ⇒ <code>object</code>
Turns URL parameters into key-value pairs. Assigns type
to boolean and number values.

**Kind**: global function  
**Returns**: <code>object</code> - QBL as key-value-pairs  

| Param | Type | Description |
| --- | --- | --- |
| searchparams | <code>URLSearchParams</code> | QBL as URL query string |

<a name="ispair"></a>

## ispair(e) ⇒ <code>boolean</code>
Checks if the argument is a pair (array with two elements, the first
must be a string)

**Kind**: global function  
**Returns**: <code>boolean</code> - true for pairs  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>array</code> | a potential pair |

<a name="flat"></a>

## flat(arr) ⇒ <code>array</code>
Flattens arrays of arrays (only one level) so that
an array af pairs remains

**Kind**: global function  
**Returns**: <code>array</code> - an array of pairs  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | an array of (potentially) nested arrays |

<a name="unnest"></a>

## unnest(obj, prefix) ⇒ <code>Array</code>
Turns a nested QBL in JSON notation into a list of
key-value-pairs. Recursively descends into each object
and carries the correct prefix string

**Kind**: global function  
**Returns**: <code>Array</code> - a list of key-value-pairs  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | QBL (fragment) in JSON notation |
| prefix | <code>string</code> | the prefix carried from outer objects |

<a name="load"></a>

## load(json) ⇒ <code>object</code>
Loads a QBL in JSON notation

**Kind**: global function  
**Returns**: <code>object</code> - Query Builder AST  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | the QBL JSON object |

<a name="load"></a>

## load(txt) ⇒ <code>object</code>
Loads a multiline QBL expression

**Kind**: global function  
**Returns**: <code>object</code> - Query Builder AST  

| Param | Type | Description |
| --- | --- | --- |
| txt | <code>string</code> | the QBL expression (may contain blank lines) |

<a name="load"></a>

## load(str, prefix) ⇒ <code>object</code>
Loads a URL query string

**Kind**: global function  
**Returns**: <code>object</code> - Query Builder AST  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | the URL query string (may start with `?`) |
| prefix | <code>string</code> | the prefix used for parameters that should be considered |

