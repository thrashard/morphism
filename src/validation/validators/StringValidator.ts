import { BaseValidator, Rule } from './BaseValidator';
import { isString } from '../../helpers';
import { ValidatorError } from './ValidatorError';

export class StringValidator extends BaseValidator<string> {
  constructor() {
    super({
      name: 'string',
      expect: `value to be typeof string`,
      test: function(value) {
        const result = value;
        if (!isString(result)) {
          throw new ValidatorError({ value, expect: this.expect });
        }
        return result;
      }
    });
  }

  min(val: number) {
    this.addRule({
      name: 'min',
      expect: `value to be greater or equal than ${val}`,
      test: function(value) {
        if (value.length < val) {
          throw new ValidatorError({ value, expect: this.expect });
        }
        return value;
      }
    });
    return this;
  }
  max(val: number) {
    this.addRule({
      name: 'max',
      expect: `value to be less or equal than ${val}`,
      test: function(value) {
        if (value.length > val) {
          throw new ValidatorError({ value, expect: this.expect });
        }
        return value;
      }
    });
    return this;
  }
  length(val: number) {
    this.addRule({
      name: 'length',
      expect: `value to be length of ${val}`,
      test: function(value) {
        if (value.length !== val) {
          throw new ValidatorError({ value, expect: this.expect });
        }
        return value;
      }
    });
    return this;
  }
  private createRegexRule(name: string, expect: string, regex: RegExp): Rule<string> {
    return {
      name,
      expect,
      test: function(value) {
        if (!regex.test(value)) {
          throw new ValidatorError({ value, expect: this.expect });
        }
        return value;
      }
    };
  }
  regex(regex: RegExp) {
    const rule = this.createRegexRule('regex', `value to match pattern: ${regex}`, regex);
    this.addRule(rule);
    return this;
  }

  alphanum() {
    const rule = this.createRegexRule('regex', `value to contain only alphanumeric characters`, /^[a-z0-9]+$/i);
    this.addRule(rule);
    return this;
  }
}
