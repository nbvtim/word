const c = console.log
const fs = require('fs')
const AdmZip = require("adm-zip")

function writeDocx(p = "/mnt/c/Users/User/Desktop/БОРТОВОЙ/Бортовой журнал 11 ноябрь 2025.docx"){
    if(fs.existsSync("./1.docx")){fs.unlinkSync("./1.docx")}
    fs.copyFileSync(p, "./1.docx")
    let zip = new AdmZip("./1.docx")
    let xml = zip.readAsText("word/document.xml")
    xml = xml.replace(/\>\</g, ">\n<").split("\n")



    let obj = {
        'w:p': [],
        'w:t': {},
        txt: ""
    }
    let wp = []
    xml.forEach((el,i)=>{
        
        if(el.match(/\<w:p /)){
            obj.txt = Object.values( obj['w:t']).join("")
            if(obj.txt.match(/\d?\d\.\d?\d\.(\d\d)?\d\d \d?\d:\d\d/)){
                wp[0] = i
            }
            obj['w:p'][0] = i
            obj['w:t']= {}
        }

        if(el.match(/\<\/w:p\>/)){ 
            wp[1] = i
        }

        if(el.match(/\<\/w:t\>/)){
            obj['w:t'][i] = el.replace(/\<\/w:t\>/ ,"").replace(/\<w:t\>/ ,"").replace(/\<w:t xml:space="preserve"\>/ ,"")
        }

    })
    c(wp[0], xml[wp[0]])
    c(wp[1], xml[wp[1]])





    // for(i = wpStart; i < xml.length; i++){
    //     c(i,xml[i])
    // }



    xml = xml.join("\n")
    fs.writeFileSync("./1.xml", xml)

    zip.addFile("word/document.xml", fs.readFileSync("./1.xml", "utf-8"), "NBV")
    zip.writeZip("./1.docx")

}
writeDocx()

