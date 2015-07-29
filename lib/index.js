'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var pdf1 = require( './number.js' ),
	pdf2 = require( './array.js' ),
	pdf3 = require( './accessor.js' ),
	pdf4 = require( './deepset.js' ),
	pdf5 = require( './matrix.js' ),
	pdf6 = require( './typedarray.js' );


// PDF //

/**
* FUNCTION: pdf( x[, opts] )
*	Evaluates the probability density function (PDF) for a F distribution.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Number} [opts.d1=1] - numerator degrees of freedom
* @param {Number} [opts.d2=1] - denominator degrees of freedom
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated PDF
*/
function pdf( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts.d1 = typeof opts.d1 !== 'undefined' ? opts.d1 : 1;
	opts.d2 = typeof opts.d2 !== 'undefined' ? opts.d2 : 1;

	if ( isNumber( x ) ) {
		return pdf1( x, opts.d1, opts.d2 );
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'pdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return pdf5( out, x, opts.d1, opts.d2 );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'pdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		return pdf6( out, x, opts.d1, opts.d2 );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return pdf4( x, opts.d1, opts.d2, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'pdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return pdf3( out, x, opts.d1, opts.d2, opts.accessor );
		}
		return pdf2( out, x, opts.d1, opts.d2 );
	}
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
