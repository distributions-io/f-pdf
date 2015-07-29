'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, matrix, d1, d2 )
*	Evaluates the probability density function (PDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} d1 - numerator degrees of freedom
* @param {Number} d2 - denominator degrees of freedom
* @returns {Matrix} output matrix
*/
function pdf( y, x, d1, d2 ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'pdf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( d1, d2 );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
