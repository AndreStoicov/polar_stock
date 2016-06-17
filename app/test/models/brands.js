'use strict';


// import the moongoose helper utilities
var utils = require('../utils');
var should = require('should');
// import our Brands mongoose model
var Brands = require('../../models/Brands').Brands;


describe('Models: Brands', function() {
    describe('#create()', function() {
        it('should create a new Brands', function(done) {
            // Create a Brands object to pass to Brands.create()
            var u = {
                name: 'Musclemeds'
            };
            Brands.create(u, function(err, createdBrands) {
                // Confirm that that an error does not exist
                should.not.exist(err);
                // verify that the returned Brands is what we expect
                createdBrands.name.should.equal('Musclemeds');

                // Call done to tell mocha that we are done with this test
                done();
            });
        });
    });
});
