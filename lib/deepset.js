'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( arr, d1, d2, path[, sep] )
*	Evaluates the probability density function (PDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2` for each array element and sets the input array.
*
* @param {Array} arr - input array
* @param {Number} d1 - numerator degrees of freedom
* @param {Number} d2 - denominator degrees of freedom
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function pdf( x, d1, d2, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		fcn,
		v, i;
	if ( arguments.length > 4 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		fcn = partial( d1, d2 );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], fcn( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
