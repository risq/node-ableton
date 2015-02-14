var currentTime = Date.now(),
    barStartTime,
    barLength,
    nextBarStartTime,
    currentBeat,
    nextBeatStartTime,
    onBeatCallback = function() {};

function init() {

    setInterval( loop, 1000 / 500 );

    play( 90 );

}

function play( tempo ) {

    
    beatLength = 15 / tempo * 1000;
    barLength = beatLength * 32;

    startBar( Date.now() );

}

function startBar( startTime ) {

    barStartTime = startTime;
    nextBarStartTime = barStartTime + barLength;
    nextBeatStartTime = barStartTime;
    currentBeat = -1;

}

function startBeat( beat ) {

    onBeatCallback(beat);
    nextBeatStartTime = barStartTime + (currentBeat + 1) * beatLength;

}

function loop() {

    currentTime = Date.now();

    if ( currentTime >= nextBarStartTime ) {

        startBar( nextBarStartTime );

    } 

    if ( currentTime >= nextBeatStartTime ) {

        currentBeat++;
        startBeat( currentBeat );

    }
}

function onBeat( callback ) {

    onBeatCallback = callback;

}

module.exports = {
    init: init,
    onBeat: onBeat
}
