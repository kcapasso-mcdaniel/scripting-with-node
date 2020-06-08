const fs = require("fs");
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex");

const sourceFile = String(fs.readFileSync("./html-pages/basic-functions.html"));

const components = getComponents(sourceFile);

const componentObjects = components.map((component) => {
   return {
      name: getName(component)[0],
      desc: trim(getDesc(component)[0]),
      inputs: getInputs(component).length,
      type: "basic", // scraping only basic.html file
      typeNum: 100, // designated for basic.html
      isFavorite: false, // default is false
   };
});

const reversedObjs = componentObjects.reverse();

const orderedObjs = [];
for (let index = 0; index < reversedObjs.length; index++) {
   const obj = reversedObjs[index];
   obj.order = obj.typeNum + index;
   orderedObjs.push(obj);
}
console.log(orderedObjs);

const targetFile = "./json-files/basic.json";

fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
