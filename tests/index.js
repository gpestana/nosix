const tap = require('tap');
const ramda = require('ramda');

const fn1 = i => true;
const fn2 = i => true;
const fn3 = i => false;

const testFactory = () => {
  const stamped = require('../index.js');
  return validate = stamped.init([fn1, fn2]);
};

tap.test('init stamped with 2 validators', t => {
  const validate = testFactory();
  t.equal(validate.validators.length, 2, 'Stamped must have two validators');
  t.equal(_.contains(validate.listValidators(), fn1), true, 
    'fn1 is a validator');
  t.equal(_.contains(validate.listValidators(), fn2), true, 
    'fn1 is a validator');
  t.equal(_.contains(validate.listValidators(), fn3), false, 
    'fn3 is not a validator');
  t.end(); 
});

tap.test('adds a new validator in runtime', t => {
  const validate = testFactory();
  validate.addValidator(fn3);

  t.equal(validate.listValidators(), 2, 'Stamped must have three validators');
  t.equal(_.contains(validate.listValidators(), fn3), 
    true, 'fn3 is a validator')
  t.end();
});

tap.test('removes a validator in runtime', t => {
  const validate = testFactory();
  validate.removeValidator(fn1);

  t.equal(validate.listValidators(), 1, 
    'Stamped must have two validators after removing one');
  t.equal(_.contains(validate.listValidators(), fn2), 
    false, 'fn3 has been is not part of the validators list anymore);
  t.end();
});

tap.test('removes a validator that does not exist', t => {
  const validate = testFactory();
  const listValidators = validate.listValidators();
  validate.removeValidator(fn3);

  t.equal(listValidators, validate.listValidators(),
    'removing a non existing validator does not change validation module');
  t.end();
});

tap.test('test valid and invalid input', t => {
  const validate = testFactory();
  const validator = input => input instanceof String 
    ? true 
    : '${input} not a string';

  validate.addValidator(validator);
  const resultsString = validate('String');
  const obj = {input: 'object'};
  const resutlsObject = validate(obj);

  t.equal(resultsString, 'String', 'valid input should return input value');
  t.equal(resultsObject, `${JSON.stringify(obj)} not a string`,
    'invalid input should return validator error message');
  t.end();
});

