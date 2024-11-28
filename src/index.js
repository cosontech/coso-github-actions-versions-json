const core = require('@actions/core');

// ****INPUTS****

const versionNumber = core.getInput('version-number');
const jsonPath = core.getInput('json-path');
const jsonProperty = core.getInput('json-property');

// ****EXECUTION****

console.log(`Loading JSON content of ${jsonPath}`);

const fs = require("fs");
fs.readFile(jsonPath, "utf8", (err, jsonString) => {
  if (err) {
    core.setFailed(err);
    return;
  }

  console.log("JSON content loaded");

  try {
    const content = JSON.parse(jsonString);
    console.log(`Current value of '${jsonProperty}' property is ${content[jsonProperty]}`);
    
    content[jsonProperty] = versionNumber
    console.log(`New value of '${jsonProperty}' property is ${content[jsonProperty]}`);

    fs.writeFile(jsonPath, JSON.stringify(content), err => {
        if (err) {
            core.setFailed(err);
            return;
        }

        console.log(`${jsonPath} has been updated`);
      });
  } 
  catch (err) {
    core.setFailed(err);
  }
});