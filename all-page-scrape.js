const fs = require("fs");
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex");

// Begin Function

function scrapeTheFile(typeGroup, orderNum) {
   // pass two parameters through the function
   // typeGroup = the group that the file belongs to
   // orderNum = the number representing the order of the number
   const fileType = "./html-pages/" + typeGroup + ".html";

   const sourceFile = String(fs.readFileSync(fileType));

   const components = getComponents(sourceFile);

   const componentObjects = components.map((component) => {
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

allComponents.push(...scrapeTheFile("basic-functions", 100));
allComponents.push(...scrapeTheFile("intermediate-functions", 200));

const targetFile = "./dist/dist.json";

fs.writeFileSync(targetFile, JSON.stringify(allComponents));
