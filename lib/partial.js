'use strict';

// FUNCTIONS //


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

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a F distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
