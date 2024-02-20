const API_Key=`e0fce2d4211a448fb98af0c7169b9658`
let news=[];
const getLatestNews = async()=>{
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_Key}`);
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=음악&page=1&pageSize=15&category=entertainment`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("ddd", news);
}

getLatestNews();
