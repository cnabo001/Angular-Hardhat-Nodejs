1. in the cli go the the directory of the build files and type npx hardhat node.
2. in the cli type npx hardhat run scripts/deploy.js --network localhost
3. in visual studio code serach for: resourceAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; and replace all the files with 
the address that populates after running the deploy cmd in step 2. 
4. if you have a web server running you can open up the dist/index.html in the browser and begin using the app.
5. if you do not have a web server running in the cli type: npm start.
