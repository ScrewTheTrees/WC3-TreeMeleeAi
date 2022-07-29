import {
    buildConfig,
    buildLogger,
    buildVersion,
    copyFolder,
    getFilesInsideDir,
    incrementBuild,
    toArrayBuffer
} from "./Utils";
import War3Map from "mdx-m3-viewer/src/parsers/w3x/map";
import * as fs from "fs-extra";
import * as path from "path";
import {LuaDestroyer} from "luadestroyer/LuaDestroyer";

export function buildEntireMap() {
    incrementBuild();

    const cwd = process.cwd();

    let config = buildConfig;
    let version = buildVersion;

    if (!fs.existsSync("target")) fs.mkdirSync("./target");
    if (!fs.existsSync("builds")) fs.mkdirSync("./builds");

    const tsLua = ".\\target\\tstl_output.lua";
    if (!fs.existsSync(tsLua)) {
        buildLogger.error(`Could not find "${tsLua}"`);
    }

    let mapFolder = `${cwd}\\maps\\${config.mapFolder}`;
    let targetFolder = `${cwd}\\target\\${config.mapFolder}`;
    let resourceFolder = `${cwd}\\${config.resourceFolder}`;

    buildLogger.info(`Building "${mapFolder}"...`);
    fs.copySync(mapFolder, targetFolder);
    const mapLua = `.\\target\\${config.mapFolder}\\war3map.lua`;

    if (!fs.existsSync(mapLua)) {
        return buildLogger.error(`Could not find "${mapLua}"`);
    }

    try {
        let tsLuaContents: string = "" + fs.readFileSync(tsLua);
        tsLuaContents = "do\n" + tsLuaContents + "\nend";

        tsLuaContents = tsLuaContents.replace(/^\["\.(.+)"]/gm, `["$1"]`);
        tsLuaContents = tsLuaContents.replace(/require\("\.(.+)"\)/g, `require("$1")`);

        fs.appendFileSync(mapLua, "\nlocal mapVersion = {}");
        fs.appendFileSync(mapLua, "\nmapVersion.major = " + version.major);
        fs.appendFileSync(mapLua, "\nmapVersion.minor = " + version.minor);
        fs.appendFileSync(mapLua, "\nmapVersion.build = " + version.build);
        let date = new Date();
        fs.appendFileSync(mapLua, `\nmapVersion.date = "${date.getFullYear()}-${date.getMonth()}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}"`);
        fs.appendFileSync(mapLua, `\n\n`);
        fs.appendFileSync(mapLua, tsLuaContents);

        buildLogger.info(`Wrote lua to ${mapLua}!`);

        if (config.minifyLua) {
            buildLogger.info(`Minify: ${mapLua}`);
            let compileLua = "" + fs.readFileSync(mapLua);
            let destroy = new LuaDestroyer();
            destroy.keyPhrasePrefix = "TheVery_";
            destroy.keyPhrasePostfix = "_EndOfYou";
            destroy.hashGenMinLength = 5;
            destroy.doKillStrings = false; //THIS IS BROKE ON 1.33
            compileLua = destroy.Destroy(compileLua);
            destroy.LogStatistics(buildLogger.info);
            fs.writeFileSync(mapLua, compileLua);
        }


    } catch (err) {
        return buildLogger.error(err);
    }

    buildLogger.info(`Remove bloat!`);
    let filesToRemove: string[] = config.removeMapFiles || [];
    for (let file of filesToRemove) {
        if (fs.existsSync(targetFolder + "\\" + file)) {
            fs.unlinkSync(targetFolder + "\\" + file);
            buildLogger.info(`Cleaned out: ${targetFolder + "\\\\" + file}`);
        }
    }

    buildLogger.info(`Inject special data!`);

    let content = "" + fs.readFileSync(targetFolder + "\\war3map.wts");
    content = content.replace(/\$\(MapName\)/g, `${config.mapName} ${version.major}.${version.minor}.${version.build}`);
    fs.writeFileSync(targetFolder + "\\war3map.wts", content);

    buildLogger.info(`Copy resource data!`);

    copyFolder(resourceFolder, targetFolder);

    buildLogger.info(`Make map archive.!`);

    makeMapArchive(config, version);

    buildLogger.info(`Completed!`);
}

function makeMapArchive(config: any, version: any) {
    const map = new War3Map();
    const filesPaths = getFilesInsideDir(`.\\target\\${config.mapFolder}`, "");
    map.archive.resizeHashtable(filesPaths.length);

    for (const fileName of filesPaths) {
        const contents = toArrayBuffer(fs.readFileSync(fileName));
        const archivePath = path.relative(`.\\target\\${config.mapFolder}`, fileName);
        const imported = map.import(archivePath, contents);

        if (!imported) {
            buildLogger.warn("Failed to import " + archivePath);
        }
    }

    const result = map.save();

    if (!result) {
        buildLogger.error("Failed to save archive.");
        return;
    }

    const buildMapFolder = config.buildFolderName;

    fs.writeFileSync(`.\\builds\\${buildMapFolder}_${version.major}.${version.minor}.${version.build}.w3x`, result);

    return result;
}