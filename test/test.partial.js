/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Check whether an element is `NaN`
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'partial pdf', function tests() {

	var	validationData = require( './fixtures/partial.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}),
		d1 = validationData.d1,
		d2 = validationData.d2;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the F pdf for given parameter values', function test() {
		var pdf;
		pdf = partial( d1, d2 );
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the probability density function', function test() {
		var pdf, actual;
		pdf = partial(  d1, d2 );
		for ( var i = 0; i < data.length; i++ ) {
			actual = pdf( data[ i ] );
			if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-14 );
			}
		}
	});

	it( 'should return `NaN` if provided `NaN` as input', function test() {
		var pdf = partial(  d1, d2 );
		assert.isTrue( isnan( pdf( NaN ) ) );
	});

	it( 'should return 1 for x=0 when d1=2', function test() {
		var pdf = partial( 2, 3 );
		assert.strictEqual( pdf( 0 ), 1 );
	});

});
