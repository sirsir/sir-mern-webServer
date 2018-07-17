var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var shell = require('shelljs');



const sirFileFolderController = {
  copyWithDirStructure: function(param){ 
    return new Promise( (resolve, reject) =>{
      try {

        let {rootPath, filePaths, destinationPath} = param
        console.log({rootPath, filePaths, destinationPath})
        let results = [];

        // resolve("File copied to ");
        // console.log(filePaths.split("\n"))
        filePaths.split("\n").forEach(f=>{
          
          if (!f){
            return;
          }
          let sourceFullPath = path.join(rootPath,f)

          let destinationFullPath = path.join(destinationPath,f)

          
          if (!fs.existsSync(sourceFullPath)){
            results.push(`Source:Not exist\t${sourceFullPath}\t${destinationFullPath}`)
            return;
          }

          if (fs.existsSync(destinationFullPath)){
            results.push(`Destination:Already Exist\t${sourceFullPath}\t${destinationFullPath}`)
            return;
          }

          // fs.existsSync(sourceFullPath))
          // .catch(()=>{
          //     results.push(`Source:Not exist\t${sourceFullPath}\t${destinationFullPath}`)
          //     throw("error");
          // })
          // .then( ()=>{
          //     fs.existsSync(destinationFullPath)
          //     .then()
          // })


          if (fs.existsSync(destinationFullPath)){
            results.push(`Destination:Already Exist\t${sourceFullPath}\t${destinationFullPath}`)
            return;
          }

          let dir = path.dirname(destinationFullPath)
          fse.ensureDirSync(dir)

          // if (!fs.existsSync(dir)){
          //     // fs.mkdirSync(dir);
          //     shell.mkdir('-p', dir);
          // }
          // console.log(sourceFullPath)

          // fs.copyFile(sourceFullPath, destinationFullPath, (err) => {
          //   console.log('========')
          //   if (err) throw err;
          //   console.log('source.txt was copied to destination.txt');
          //   if (fs.existsSync(destinationFullPath)){
          //     results.push(`[ok] ${sourceFullPath} => ${destinationFullPath}`)
          //   } else {
          //     results.push(`[error] ${sourceFullPath} => ${destinationFullPath}`)
          //   }
          // });

          fse.copySync(sourceFullPath, destinationFullPath);
          console.log('========')
          if (fs.existsSync(destinationFullPath)){
            results.push(`Copied successfully\t${sourceFullPath}\t${destinationFullPath}`)
          } else {
            results.push(`Error\t${sourceFullPath}\t${destinationFullPath}`)
          }

          


        })
        

        resolve(results.join("\n"))
      } catch(e) {
        console.log(e)
        reject(e);
      }          

    })

  },

}

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.copyWithDirStructure = function(req, res) {
  // console.log(req)
  // res.send('NOT IMPLEMENTED: Site Home PagesXXZ');
  sirFileFolderController.copyWithDirStructure(req.body)
  .then( result => {
    res.json({
      success: true,
      message: result
    })
  }).catch( e => {
    res.json({
      success: false,
      message: e
    })
  })

};
