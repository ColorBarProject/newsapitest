const API_Key=`e0fce2d4211a448fb98af0c7169b9658`
let news=[];
const getLatestNews = async()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_Key}`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("ddd", news);
}

getLatestNews();
