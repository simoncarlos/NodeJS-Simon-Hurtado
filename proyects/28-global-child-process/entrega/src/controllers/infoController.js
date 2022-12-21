import parseArgs from "minimist";

export const infoController = (req, res) => {
    const dataProcess = {
        arg: parseArgs( process.argv ),
        so: process.platform,
        node: process.version,
        memory: process.memoryUsage(),
        path: process.cwd(),
        processId: process.pid,
        folder: process.execPath,
    }
    console.log(dataProcess);
    res.render("info", dataProcess);
};