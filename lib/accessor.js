'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, arr, d1, d2, accessor )
*	Evaluates the probability density function (PDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2` using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} d1 - numerator degrees of freedom
* @param {Number} d2 - denominator degrees of freedom
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pdf( y, x, d1, d2, clbk ) {
	var len = x.length,
		fcn,
		v, i;

	fcn = partial( d1, d2 );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = fcn( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
