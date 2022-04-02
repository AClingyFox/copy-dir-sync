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
        contents.forEach(content => copyDirSync(content, newPath, newDest));
    }
}

function copyDirSync(dirPath) {
    fs.readdirSync(dirPath).forEach(fileOrDir => copyDirSyncRunner(fileOrDir, tempNwjsNormalPath, nwjsNormalFolderPath));
}

module.exports = copyDirSync;
module.exports.copyDirSyncRunner = copyDirSyncRunner;
