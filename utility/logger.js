const pino = require('pino')

const transport = pino.transport({
    targets: [
        {
            level: 'trace',
            target: 'pino/file',
            options: {
                destination: "./logs/bot.log",
            },
        },
        {
            level: 'trace',
            target: 'pino-pretty',
            options: {},
        },
    ],
});


const logger = pino(transport)

module.exports = logger