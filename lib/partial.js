'use strict';

// FUNCTIONS //

var ibeta_derivative = require( './ibeta_derivative.js' );


// PARTIAL //

/**
* FUNCTION: partial( d1, d2 )
*	Partially applies numerator degrees of freedom `d1` and denominator degrees of freedom `d2` and returns a function for evaluating the probability density function (PDF) for a F distribution.
*
* @param {Number} d1 - numerator degrees of freedom
* @param {Number} d2 - denominator degrees of freedom
* @returns {Function} PDF
*/
function partial( d1, d2 ) {
	var d1d2 = d1 * d2,
		d1by2 = d1 / 2,
		d2by2 = d2 / 2;
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a F distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		var y, z,
			v1x,
			dens;
		v1x = d1 * x;
		if ( v1x > d2 ) {
			y = d1d2 / ( ( d2 + v1x ) * ( d2 + v1x ) );
			dens = y * ibeta_derivative( d2 / ( d2 + v1x ), d2by2, d1by2 );
		} else {
			z = d2 + v1x;
			y = ( z * d1 - x * d1 * d1 ) / z*z;
			dens = y * ibeta_derivative( d1 * x / ( d2 + v1x ), d1by2, d2by2 );
		}
		return dens;
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
