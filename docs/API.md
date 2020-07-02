## Functions

<dl>
<dt><a href="#query">query(input)</a> ⇒ <code>object</code></dt>
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
<dt><a href="#transformconjunctions">transformconjunctions(qbtree)</a> ⇒ <code>object</code></dt>
<dd><p>Transforms a Quory Builder AST that has implicit conjunctions
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
</dl>

<a name="query"></a>

## query(input) ⇒ <code>object</code>
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
| key | <code>string</code> | a string that shoul occur oly once in the arrav |

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

<a name="transformconjunctions"></a>

## transformconjunctions(qbtree) ⇒ <code>object</code>
Transforms a Quory Builder AST that has implicit conjunctions
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

