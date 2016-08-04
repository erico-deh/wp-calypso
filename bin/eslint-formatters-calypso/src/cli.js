/* eslint strict: "off" */

'use strict';

const path = require( 'path' );

/*
* This function should *not* call process.exit() directly,
* It should only return exit codes. This allows other programs
* to use the function and still control when the program exits.
*
*/

module.exports = function( report, options ) {
	const getFormatter = format => {
		// See https://github.com/eslint/eslint/blob/master/lib/cli-engine.js#L477

		let formatterPath;

		// default is stylish
		format = format || 'stylish';

		// only strings are valid formatters
		if ( typeof format === 'string' ) {
			// replace \ with / for Windows compatibility
			format = format.replace( /\\/g, '/' );

			// if there's a slash, then it's a file
			if ( format.indexOf( '/' ) > -1 ) {
				formatterPath = path.resolve( process.cwd(), format );
			} else {
				formatterPath = 'eslint/lib/formatters/' + format;
			}

			try {
				return require( formatterPath );
			} catch ( ex ) {
				const msg = 'Problem loading formatter: ' + formatterPath + '\nError: ';
				ex.message = msg + ex.message;
				throw ex;
			}
		} else {
			return null;
		}
	};

	const getProcessor = processor => {
		processor = processor || 'eslines';
		return require( './formatters/' + processor );
	};

	const processor = getProcessor( options.processor );
	const newReport = JSON.parse( processor( report ) );

	if ( newReport ) {
		const formatter = getFormatter( options.format );
		process.stdout.write( formatter( newReport ) );

		return 1;
	}
	// it has nothing to show
	return 0;
};
