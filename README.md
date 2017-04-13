## nosix.js

nosix.js abstracts input validation, making it easier and straighforward for
you to validate any type of input. 

You run nosix by providing a list of validator functions and an input. nosix
will test the input against the validators and return the results.

If the input fails to pass one of more validators, 
the result will be an object with the validation errors. You can initialize 
nosix.js with a set of validators and add/remove validators at run time.

By default, Nosix works async. You may also run Nosix in a sync mode.

### Instalation

```
npm install nosix
```

### How to use nosix.js

```javascript
const nosix = require('nosix');

const fn1 = input => typeof input == 'string' ? true : `${input} must be a string`;
const fn2 = input => input != '' ? true : `${input} cannot be empty`;

const stringInput = "a random string";
const objInput = { random: "object" };

// validate async
nosix.validate(stringInput, [fn1, fn2], err => {
  if(!err) console.log('validation OK'); // validation OK
});

// validate sync
const err = validateSync(objectInput, [fn1, fn2]);
console.log(err); // [ '[Object object] must be a string' ] 
```

The returned object `err` is null if there was no validation errors. Otherwise
the returned value is an array with all validation errors.

### License:

MIT © [Gonçalo Pestana](http:/gpestana.com/)

