var midi = require( 'midi' );

// Set up a new output. 
var output = new midi.output();


var metronome = require( './metronome' );


var port = 2;

var notes = {
    C: 60,
    Cs: 61,
    D: 62,
    Ds: 63,
    E: 64,
    F: 65,
    Fs: 66,
    G: 67,
    Gs: 68,
    A: 69,
    As: 70,
    B: 71
};

var drumsHits = [ {
    name: 'kick',
    note: 36,
    pattern: [ 127, 0, 0, 0, 40, 0, 0, 0, 127, 0, 0, 0, 40, 120, 0, 0, 127, 0, 0, 0, 40, 0, 0, 0, 127, 0, 0, 0, 40, 0, 0, 80 ]
}, {
    name: 'snare',
    note: 38,
    pattern: [ 0, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 0 ]
}, {
    name: 'hihat',
    note: 42,
    pattern: [ 60, 0, 90, 0, 30, 50, 110, 0, 60, 0, 90, 0, 30, 50, 110, 0, 60, 0, 90, 0, 30, 50, 110, 0, 60, 0, 90, 0, 30, 50, 110, 0 ]
}, {
    name: 'sample1',
    note: 40,
    pattern: [ 90, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 90, 0, 0, 0, 40, 0, 0, 0, 90, 0, 0, 0, 0, 0, 0, 70 ]
}, {
    name: 'sample2',
    note: 43,
    pattern: [ 0, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0 ]
}, {
    name: 'sample3',
    note: 46,
    pattern: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0 ]
},{
    name: 'sample3',
    note: 47,
    pattern: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 0 ]
}];


// Count the available output ports. 
output.getPortCount();

// Get the name of a specified output port. 
console.log( output.getPortName( port ) );

// Open the first available output port. 
output.openPort( port );

// Send a MIDI message. 


// output.sendMessage([144, 64, 127]);

// output.sendMessage([128, 64, 127]);


metronome.init();

metronome.onBeat( function ( beat ) {

    drumsHits.forEach( function ( hit ) {

        if ( hit.pattern[ beat ] !== 0 ) {

        	console.log(beat, hit.name)
            output.sendMessage( [ 144, hit.note, hit.pattern[ beat ] ] );

        } else if ( beat === 0 && hit.pattern[ hit.pattern.length ] !== 0 || hit.pattern[ beat - 1 ] !== 0 ) {

            output.sendMessage( [ 128, hit.note, 127 ] );

        }

    } )

    // if ( beat === 0 ) {

    // 	output.sendMessage([144, 64, 127]);

    // } else if ( beat === 1 ) {

    // 	output.sendMessage([128, 64, 127]);

    // }

} );



// Close the port when done. 
// output.closePort();
