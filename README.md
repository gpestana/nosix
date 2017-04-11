##nosix.js

nosix.js abstracts input validation, making it easier and straighforward for
you to validate any type of input. 

You provide a list of validator functions which will run 
against the input to validate. If the input fails to pass one of more validators, 
the result will be an object with the validation errors. You can initialize 
nosix.js with a set of validators and add/remove validators at run time.

### Instalation

```
npm install nosix
```

### How to use nosix.js

#### 1) Initialize the validation module
To initialize the validation module, you may provide zero..* validators. 
Validators are functions wich will run agains the input to decide whether the 
input is valid or not.

```javascript
const nosix = require('nosix');

// Validator functions
const fn1 = input => input instanceof String ? true : false;
const fn2 = input => input! = '' ? true : false;

// Initializes the validation module
const validate = nosix.init([fn1, fn2]);
```

#### 2) Validate input
The input can be of any type, as far as the validators are aware of it.

```
const nosix = require('nosix');

const fn1 = input => input instanceof String ? true : `${input} must be a string';
const fn2 = input => input != '' ? true : `${input} cannot be empty`;

const validate = nosix.init([fn1, fn2]);

const inputString = 'hello Mars'
const inputObj = { 'hello': 'Mars' };

const validationResultsString = validate(inputString);

console.log(validationResultsString) // 'hello Mars' 
if (validationResultsString == inputString) {
  //result is valid!  
};

// When result is not valid, the returned object will contain the error messages
// from the validators
const validationResultsObject = validate(inputObject);
console.log(validationResultsObject) // { fn1: '{ "hello": "Mars" } must be a string' }
```

#### 3) Adding and removing validators in runtime
It is possible to add and remove validators in runtime:

```javascript
// ...

const validate = nosix([fn1, fn2]);
const fn3 = input => input instanceof Object ? true : false

validate.addValidator(fn2); // Adds new validator to previously initialized validation module
validate.removeValidator(fn1); // Removes validator function from validation module
validate.removeValidator(fnDoesNotExist); // If removing a non existing validator, nothing happens

validate.listValidators(); // Lists all active validators

```

### API

#### validationModule = nosix.init([fn1, fn2, ...])
Initializes a new validation module

#### validationModule(input)
Validates any given input against validators

#### validationModule.addValidator(fn)
Adds a new validator to validation module in runtime

#### validationModule.removeValidator(fn)
Removes a validator from validation module in runtime

#### validationModule.listValidators()
Lists all active validators

### License:

MIT © [Gonçalo Pestana](http:/gpestana.com/)

