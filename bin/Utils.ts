import * as fs from "fs-extra";
import * as path from "path";
import { createLogger, format, transports } from "winston";
const ncp = require('ncp').ncp;
const { combine, timestamp, printf} = format;

const loggerFormatFunc = printf(({ level, message, timestamp }) => {
    return `[${timestamp.replace("T", " ").split(".")[0]}] ${level}: ${message}`;
});

export const buildLogger = createLogger({
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                timestamp(),
                loggerFormatFunc
            ),
        }),
        new transports.File({
            filename: "project.log",
            format: combine(
                timestamp(),
                loggerFormatFunc
            ),
        }),
    ]
});


export function loadJsonFile(fname: string) {
    try {
        return JSON.parse(fs.readFileSync(fname).toString());
    } catch (e) {
        buildLogger.error("Could not find file: " + fname);
        return {};
    }
}

// Parse configuration
export let buildConfig = loadJsonFile("config.json");
export let buildVersion = {major: 1, minor: 0, build: 0};
if (fs.existsSync("build.json")) {
    buildVersion = loadJsonFile("build.json");
}


export function incrementBuild() {
    buildVersion.build += 1;
    fs.writeFileSync("build.json", JSON.stringify(buildVersion));
    buildLogger.debug("Increment Build");
}
export function incrementMinor() {
    buildVersion.build = 0;
    buildVersion.minor += 1;
    fs.writeFileSync("build.json", JSON.stringify(buildVersion));
    buildLogger.debug("Increment Minor version");
}
export function incrementMajor() {
    buildVersion.build = 0;
    buildVersion.minor = 0;
    buildVersion.major += 1;
    fs.writeFileSync("build.json", JSON.stringify(buildVersion));
    buildLogger.debug("Increment Major version");
}

export function getFilesInsideDir(startPath: string, filter: string): string[] {
    if (!fs.existsSync(startPath)) {
        buildLogger.log("Cannot find directory: ", startPath);
        return [];
    }
    let retvar: string[] = [];
    let files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            retvar.push(...getFilesInsideDir(filename, filter)); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            retvar.push(filename);
        }
    }
    return retvar;
}

export function copyFolder(startPath: string, endPath: string) {
    // To copy a folder or file
    if (!fs.existsSync(startPath)) return;
    fs.copySync(startPath, endPath);
}

export function toArrayBuffer(b: Buffer): ArrayBuffer {
    let ab = new ArrayBuffer(b.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < b.length; ++i) {
        view[i] = b[i];
    }
    return ab;
}