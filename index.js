const request = require('request-promise');
const cheerio = require('cheerio');
const fs= require('fs');
const json2csv= require('json2csv').Parser ;

const movie = "https://m.imdb.com/title/tt9680440/";
(async ()=>{
    let webData =[]
    const response =await request({
        uri: movie,
        headers : {
            accept: 
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":"en-US,en;q=0.9,hi-IN;q=0.8,hi;q=0.7"
        },
        gzip:true
    });
    
    let $ =cheerio.load(response)
    let title = $('div[class = "title_wrapper"]>h1').text().trim()
    let summary = $('div[class="summary_text"]').text().trim()
    let ratings = $('div[class = "ratingValue"]>strong > span').text()

    webData.push({
        title:title,
        summary:summary,
        ratings:ratings
    });

    const csvfinal = new json2csv()
    const csv = csvfinal.parse(webData)

    fs.writeFileSync("./pataallokk.csv",csv,"utf-8")

}

)();