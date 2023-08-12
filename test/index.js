const { expect } = require('chai');
const { validateWithJoi } = require('../index');

describe('Custom Validation Rules', function() {
    // Validate standart rules like string, numbers, min max, required etc
    it('should validate required rule', function() {
        const error = validateWithJoi('test', {key: 'test', type: 'string', validation: 'required'});
        expect(error).to.be.null;

        const error2 = validateWithJoi('', {key: 'test', type: 'string', validation: 'required'});
        expect(error2).to.not.be.null;
        expect(error2.details[0].message).to.equal('"test" is not allowed to be empty');
    });

    it('should validate string rule', function() {
        const error = validateWithJoi('test', {key: 'test', type: 'string', validation: 'min:3||max:5'});
        expect(error).to.be.null;

        const error2 = validateWithJoi('test', {key: 'test', type: 'string', validation: 'min:5||max:10'});
        expect(error2).to.not.be.null;
        expect(error2.details[0].message).to.equal('"test" length must be at least 5 characters long');

        const error3 = validateWithJoi('test', {key: 'test', type: 'string', validation: 'min:1||max:3'});
        expect(error3).to.not.be.null;
        expect(error3.details[0].message).to.equal('"test" length must be less than or equal to 3 characters long');
    });

    it('should validate number rule', function() {
        const error = validateWithJoi(5, {key: 'test', type: 'number', validation: 'min:3||max:5'});
        expect(error).to.be.null;

        const error2 = validateWithJoi(5, {key: 'test', type: 'number', validation: 'min:6||max:10'});
        expect(error2).to.not.be.null;
        expect(error2.details[0].message).to.equal('"test" must be greater than or equal to 6');

        const error3 = validateWithJoi(5, {key: 'test', type: 'number', validation: 'min:1||max:3'});
        expect(error3).to.not.be.null;
        expect(error3.details[0].message).to.equal('"test" must be less than or equal to 3');
    });
});
    
describe('Custom Validation Rules', function() {
    it('should validate custom_list rule', function() {
        const error = validateWithJoi('apple,banana', {key: 'fruitList', type: 'string', validation: 'custom_list:apple,banana,orange'});
        expect(error).to.be.null;

        const error2 = validateWithJoi('apple,grape', {key: 'fruitList', type: 'string', validation: 'custom_list:apple,banana,orange'});
        expect(error2).to.not.be.null;
        expect(error2.details[0].message).to.equal('Invalid Element(s): grape. Allowed: apple, banana, orange');
    });

    it('should validate ipv4 rule', function() {
        const error = validateWithJoi('192.168.1.1', {key: 'ipAddress', type: 'string', validation: 'ipv4'});
        expect(error).to.be.null;

        const error2 = validateWithJoi('300.168.1.1', {key: 'ipAddress', type: 'string', validation: 'ipv4'});
        expect(error2).to.not.be.null;
        expect(error2.details[0].message).to.equal('Invalid IPv4 address');
    });

    it('should validate ipv6 rule', function() {
        const error = validateWithJoi('2001:0db8:85a3:0000:0000:8a2e:0370:7334', {key: 'ipAddress', type: 'string', validation: 'ipv6'});
        expect(error).to.be.null;

        const error2 = validateWithJoi('2001:0db8:85a3:0000:0000:8a2e:0370:733Z', {key: 'ipAddress', type: 'string', validation: 'ipv6'});
        expect(error2).to.not.be.null;
        expect(error2.details[0].message).to.equal('Invalid IPv6 address');
    });

    // Additional tests can be added for other rules and scenarios
});