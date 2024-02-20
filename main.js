const API_Key=`e0fce2d4211a448fb98af0c7169b9658`
let news=[];
const getLatestNews = async()=>{
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_Key}`);
    const url = new URL(`https://noona-news-api-test.netlify.app/top-headlines?page=1&pagesize=15&category=entertainment`);
    const response = await fetch(url);
    console.log("rrr", response);
    const data = await response.json();
    news = data.articles;
    console.log("ddd", news);
}

getLatestNews();
