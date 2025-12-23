const c = console.log
const fs = require('fs')
const AdmZip = require("adm-zip")

function writeDocx(p = "/mnt/c/Users/User/Desktop/БОРТОВОЙ/Бортовой журнал 11 ноябрь 2025.docx"){

    let zip = new AdmZip(p)
    let xml = zip.readAsText("word/document.xml")
    xml = xml.replace(/\<w:p /g, "\n<w:p ").split("\n")
    xml.push(...xml.pop().replace("<\/w:p>", "<\/w:p>\n").split("\n"))
    let w_documentSart = [xml[0],xml[1]]
    let w_documentEnd  = [xml[xml.length-1]]
    let w_body = []

    //      fs.writeFileSync("./1.xml", xml.join("\n"))
    //      .match(/\d?\d\.\d?\d\.(\d\d)?\d\d \d?\d:\d\d/)
    //      .match(/\<\/w:p\>/)
    //      .replace(/<\/w:t>/g, "").replace(/<w:t>/g, "").replace(/<w:t xml:space="preserve">/g, "")

    let txt = ""
    let wpStartID
    let wpEndID
    xml.forEach((el,i)=>{
        pr = el.replace(/\>\</g, ">\n<").split("\n")
        if(txt.match(/\d?\d\.\d?\d\.(\d\d)?\d\d \d?\d:\d\d(.+)?/)){
            wpStartID   =   i-1
        }
        if(txt.match(/Начальник смены СВК/)){
            wpEndID     =   i-1
        }

        txt = ""

        pr.forEach((ell,ii)=>{
            if(ell.match(/\<\/w:t\>/)){
                txt += ell.replace(/<\/w:t>/g, "").replace(/<w:t>/g, "").replace(/<w:t xml:space="preserve">/g, "")
            }
        })

    })

    for(i = wpStartID; i <= wpEndID; i++){
        w_body.push(xml[i])
    }

    result_XML = [...w_documentSart, ...w_body, ...w_documentEnd]


    fs.copyFileSync(p, __dirname+"/out.docx")
    let outZip = new AdmZip(__dirname+"/out.docx")
    outZip.addFile("word/document.xml", result_XML.join("\n"), "NBV")
    outZip.writeZip(__dirname+"/out.docx")

}
writeDocx()