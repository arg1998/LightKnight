const fs = window.require("fs");
const pathResolver = window.require("path");

export const exist = path => fs.existsSync(path);
export const mkdir = (path, recursive = true) =>
  fs.mkdirSync(path, { recursive });

export const readJsonFile = (dir, filename) => {
  return new Promise((resolve, reject) => {
    const full_path = pathResolver.join(dir, filename);
    try {
      if (exist(full_path)) {
        const data = fs.readFileSync(full_path);
        resolve(JSON.parse(data));
      } else {
        reject(`readJsonFile(): File Does Not Exist => ${full_path}`);
      }
    } catch (error) {
      reject(`readJsonFile(): Error => ${error}`);
    }
  });
};

export const writeJsonFile = (dir, filename, data) => {
  return new Promise((resolve, reject) => {
    const full_path = pathResolver.join(dir, filename);
    try {
      if (!exist(dir)) {
        mkdir(dir);
      }
      fs.writeFile(full_path, JSON.stringify(data, undefined, 2),null,(err)=>{
        if(err){
          reject(`writeJsonFile(): Error => ${err}`);
        }
      });
      resolve(true);
    } catch (error) {
      reject(`writeJsonFile(): Error => ${error}`);
    }
  });
};

export const readMusicBlob = (dir, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const full_path = pathResolver.join(dir, filename);
      if (!exist(full_path)) {
        reject(`readMusicBlob(): Music file does not exist => ${full_path}`);
      } else {
        fs.readFile(full_path, (err, buff) => {
          if (err) {
            reject(`readMusicBlob(): Error while reading the file => ${err}`);
          } else {
            const musicBlob = new Blob([new Uint8Array(buff)]);
            resolve(musicBlob);
          }
        });
      }
    } catch (error) {
      reject(`readMusicBlob(): Error catched  => ${error}`);
    }
  });
};

export const copyFile = (from, to) => {
  return new Promise((resolve, reject) => {
    fs.copyFile(from, to, err => {
      if (err) {
        reject(err);
      } else {
        resolve(to);
      }
    });
  });
};

export const getFileName = fullPath => fullPath.replace(/^.*[\\\/]/, "");
