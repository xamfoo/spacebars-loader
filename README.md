# spacebars-loader

A plugin for webpack to compile Spacebars templates for running on a Meteor
platform.

## Installation

```
npm install spacebars-loader --save-dev
```

### Prerequisites

Requires webpack.

Compiles to run for Meteor release 1.1.0.2

## Usage

### Imports

```
var template = require('spacebars-loader!./myTemplate.html');

// ES6
import {template} 'spacebars-loader!./myTemplate.html';
```

### webpack.config.js

```javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'spacebars-loader'
      }
    ]
  }
};
```

### Query options

- `attachGlobal` (default=true)
  - Don't attach template to `Template` object if `false`
  - Example: `spacebars-loader?attachGlobal=false`

## Output

The loader compiles a Spacebars template

```html
<template name='myTemplate'>
  <div>
    <h1>My Template</h1>
  </div>
</template>
```

to a Meteor compatible output:

```javascript
module.exports.template = new Template("Template.myTemplate", (function () {
  var view = this; return HTML.DIV("\n    ", HTML.H1("My Template"), "\n  ");
}));
Template.__checkName("myTemplate");
Template["myTemplate"] = module.exports.template;
```

The exports allow you to use it in a JS file like this:

```javascript
import {template} from './myTemplate.html';

template.onCreated(function () {
  console.log('Created a template!');
});
```
