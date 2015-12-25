'use strict';

// FUNCTIONS //

var ibeta_derivative = require( './ibeta_derivative.js' );


// PDF //

/**
* FUNCTION: pdf( x, d1, d2 )
*	Evaluates the probability density function (PDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} d1 - numerator degrees of freedom
* @param {Number} d2 - denominator degrees of freedom
* @returns {Number} evaluated PDF
*/
function pdf( x, d1, d2 ) {

	if ( x < 0 ) {
		return NaN;
	}

	if ( x === 0 ) {
		if ( d1 < 2 ) {
			return NaN;
		} else if( d1 === 2 ) {
			return 1;
		} else {
			return 0;
		}
	}

	var y, z,
		v1x,
		dens;
	v1x = d1 * x;
	if ( v1x > d2 ) {
		y = ( d2 * d1 ) / ( ( d2 + v1x ) * ( d2 + v1x ) );
		dens = y * ibeta_derivative( d2 / ( d2 + v1x ), d2 / 2, d1 / 2 );
	} else {
		z = d2 + v1x;
		y = ( z * d1 - x * d1 * d1 ) / z*z;
		dens = y * ibeta_derivative( v1x / ( d2 + v1x ), d1 / 2, d2 / 2 );
	}
	return dens;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
