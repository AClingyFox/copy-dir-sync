const fs = require('fs');
const path = require('path');

function copyDirSyncRunner (fileOrDir, currentPath, dest) {
    const currentContent = path.join(currentPath, fileOrDir);
    if (fs.statSync(currentContent).isFile()) {
        const currentFilePath = path.join(currentPath, fileOrDir);
        const newFilePath = path.join(dest, fileOrDir);
        fs.copyFileSync(currentFilePath, newFilePath);
    } else {
        const newPath = path.join(currentPath, fileOrDir);
        const newDest = path.join(dest, fileOrDir);
        fs.mkdirSync(newDest);
        const contents = fs.readdirSync(newPath);
        contents.forEach(content => copyDirSyncRunner(content, newPath, newDest));
    }
}

function copyDirSync(dirPath, dirDest) {
    const destExists = fs.existsSync(dirDest);
    if (destExists === false) {
        fs.mkdirSync(dirDest);
    }
    fs.readdirSync(dirPath).forEach(fileOrDir => copyDirSyncRunner(fileOrDir, dirPath, dirDest));
}

module.exports = copyDirSync;
module.exports.copyDirSyncRunner = copyDirSyncRunner;
