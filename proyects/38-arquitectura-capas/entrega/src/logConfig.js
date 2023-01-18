import log4js from "log4js";

log4js.configure({
    appenders: {
        infoConsole: { type: 'console' },
        warnFile: { type: 'file', filename: 'warn.log' },
        errorFile: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: { appenders: ['infoConsole'], level: 'trace' },
        consola: { appenders: ['infoConsole'], level: 'info' },
        archivoWarn: { appenders: ['warnFile'], level: 'warn' },
        archivoError: { appenders: ['errorFile'], level: 'error' }
    }
});

export const loggerConsole = log4js.getLogger("consola");
export const loggerWarn = log4js.getLogger("archivoWarn");
export const loggerError = log4js.getLogger("archivoError");