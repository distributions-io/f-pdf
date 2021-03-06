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
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var	validationData = require( './fixtures/number.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		}),
		d1 = validationData.d1,
		d2 = validationData.d2;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the F probability density function', function test() {
		var actual;
		for ( var i = 0; i < data.length; i++ ) {
			actual =  pdf( data[ i ], d1, d2 );
			if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-14 );
			}
		}
	});

	it( 'should return `NaN` if provided `NaN` as input', function test() {
		assert.isTrue( isnan( pdf( NaN, d1, d2 ) ) );
	});

	it( 'should return 1 for x=0 when d1=2', function test() {
		assert.strictEqual( pdf( 0, 2, 3 ), 1 );
	});

	it( 'should return Infinity for x=0 if d1 < 2', function test() {
		assert.strictEqual( pdf( 0, 1.5, 3 ), Number.POSITIVE_INFINITY );
	});

});
