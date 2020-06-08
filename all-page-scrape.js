const fs = require("fs");
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex");

// Begin Function

function scrapeTheFile(typeGroup, orderNum) {
   // pass two parameters through the function
   // typeGroup = the group that the function belongs to
   // orderNum = the number representing the order of the function
   const functionFileType = "./html-pages/" + typeGroup + ".html";

   const sourceFile = String(fs.readFileSync(functionFileType));

   const components = getComponents(sourceFile);

   const componentObjects = components.map((component) => {
      console.log(component);

      return {
         name: getName(component)[0],
         desc: trim(getDesc(component)[0]),
         inputs: getInputs(component).length,
         type: typeGroup, // scraping the file of the group name
         typeNum: orderNum, // designated number for the order of html files
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
   return orderedObjs;
}

allComponents = [];
// here we are calling the function that scrapes the file and pushing it to a new array called allComponents
allComponents.push(...scrapeTheFile("basic-functions", 100));
allComponents.push(...scrapeTheFile("intermediate-functions", 200));
allComponents.push(...scrapeTheFile("functional", 300));
allComponents.push(...scrapeTheFile("algorithm", 400));

console.log(allComponents.length);

const targetFile = "./dist/dist.json";

fs.writeFileSync(targetFile, JSON.stringify(allComponents));
