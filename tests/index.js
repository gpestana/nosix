const tap = require('tap');
const _ = require('ramda');
const nosix = require('../index.js');

const fn1 = i => typeof i == 'string' ? true : 'not a string';
const fn2 = i => i != '' ? true : 'cannot be empty';
const fn3 = i => 'always invalid';

const stringInput = "a string";
const emptyStringInput = "";

tap.test('test valid input async', t => {
  nosix.validate(stringInput, [fn1, fn2], err => {
    t.equal(err, null, 'async validate with valid input should return null obj');
    t.end();
  });
});

tap.test('test valid input sync', t => {
  const err = nosix.validateSync(stringInput, [fn1, fn2]);
  t.equal(err, null, 'sync validate with valid input should return null obj');
  t.end();
});

tap.test('test invalid input async', t => {
  const err = nosix.validateSync('', [fn1, fn2]);
  t.equal(err[0], 'cannot be empty', 
    'async validate with invalid input should return correct error message');
  t.end();
});

tap.test('test invalid input sync', t => {
  const err = nosix.validateSync({a:'b'}, [fn1, fn2]);
  
  t.equal(err[0], 'not a string', 
    'sync validate with invalid input should return correct error message');
  t.end();
});

tap.test('test invalid input with multiple errors', t => {
  const err = nosix.validateSync('', [fn1, fn2, fn3]);

  t.equal(_.contains('cannot be empty', err), true, 
    'validate with invalid input should return correct error messages');
  t.equal(_.contains('always invalid', err), true, 
    'validate with invalid input should return correct error messages');
  t.end();
});

