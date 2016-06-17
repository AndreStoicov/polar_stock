'use strict';

var winston = require('winston');
var MongoDB = require('winston-mongodb').MongoDB;

// Set up logger
var myCustomLevels = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    colors: {
        debug: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    }
};

var mongoTransport = {
    db: 'mongodb://localhost:27017/Polar',
    collection: 'logs'
};

var logger = new(winston.Logger)({
    levels: myCustomLevels.levels,
    transports: [
        new(winston.transports.Console)({
            colorize: true,
            timestamp: true
        })
    ]
});

logger.add(MongoDB, mongoTransport);

var origLog = logger.log;

var expor = {
    log: function(lvl, msg) {

        if (!logger.transports.mongodb) {
            logger.add(MongoDB, mongoTransport);
        }

        logger.transports.mongodb.level = lvl;

        if (lvl === 'debug') {
            logger.remove(logger.transports.mongodb);
        }

        logger.level = lvl;

        if (msg instanceof Error) {
            var args = Array.prototype.slice.call(arguments);
            args[1] = msg.stack;
            origLog.apply(logger, args);
        } else {
            origLog.apply(logger, arguments);
        }
    }
};

module.exports = expor;
