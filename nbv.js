const c = console.log
const fs = require('fs')
const AdmZip = require("adm-zip")

function writeDocx(p = "/mnt/c/Users/User/Desktop/БОРТОВОЙ/Бортовой журнал 11 ноябрь 2025.docx"){

    let zip = new AdmZip(p)
    let xml = zip.readAsText("word/document.xml")
    xml = xml.replace(/\<w:p /g, "\n<w:p ").split("\n")
    fs.writeFileSync("./1.xml", xml.join("\n"))


    //      .match(/\d?\d\.\d?\d\.(\d\d)?\d\d \d?\d:\d\d/)
    //      .match(/\<\/w:p\>/)
    //      .replace(/<\/w:t>/g, "").replace(/<w:t>/g, "").replace(/<w:t xml:space="preserve">/g, "")

    let txt = ""
    let wpStartID
    let wpEndId
    xml.forEach((el,i)=>{
        pr = el.replace(/\>\</g, ">\n<").split("\n")
        if(txt.match(/\d?\d\.\d?\d\.(\d\d)?\d\d \d?\d:\d\d(.+)?/)){
            wpStartID =     i - 1
        }
        if(txt.match(/Начальник смены СВК/)){
            wpEndId =       i - 1
        }

        txt = ""

        pr.forEach((ell,ii)=>{
            if(ell.match(/\<\/w:t\>/)){
                txt += ell.replace(/<\/w:t>/g, "").replace(/<w:t>/g, "").replace(/<w:t xml:space="preserve">/g, "")
            }
        })

    })
    // c( wpStartID , xml[wpStartID ]      )
    // c( wpEndId-2 , xml[wpEndId-2 ]      )
    // c( wpEndId   , xml[wpEndId   ]      )

    // 

    let ms = [0,1,2,3,4,5]
    let mss = ["11", "22", "33"]

    ms.splice(4 ,0 , ...mss, "44")
    c(ms)

    ms = ms.slice(4,8)
    c(ms)






    // for(i = wpStart; i < xml.length; i++){
    //     c(i,xml[i])
    // }



    // xml = xml.join("\n")
    // fs.writeFileSync("./1.xml", xml)

    // zip.addFile("word/document.xml", fs.readFileSync("./1.xml", "utf-8"), "NBV")
    // zip.writeZip("./1.docx")

}
writeDocx()

