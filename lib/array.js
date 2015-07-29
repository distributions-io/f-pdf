'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, arr, d1, d2 )
*	Evaluates the probability density function (PDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} d1 - numerator degrees of freedom
* @param {Number} d2 - denominator degrees of freedom
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pdf( y, x, d1, d2 ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial( d1, d2 );
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = fcn( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
