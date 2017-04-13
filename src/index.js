const _ = require('ramda');

const runValidator = _.curry((input, fn) => fn(input))
const traverseValidators = 
  (input, validators) => _.map(runValidator(input), validators);

module.exports.validateSync = (input, validators) => {
  const results = traverseValidators(input, validators);
  return _.all(_.equals(true))(results) 
    ? null 
    : _.filter(x => x != true, results);
};

module.exports.validate = (input, validators, cb) => {
  const results = traverseValidators(input, validators);
  return _.all(_.equals(true))(results) 
    ? cb(null) 
    : cb(_.filter(x => x != true, results));
};

