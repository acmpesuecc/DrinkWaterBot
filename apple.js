import axios from 'axios';

const BASE_URL = 'https://type.fit/api';

const getQuotes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/quotes`);
    const quotes = res.data;
    var len = quotes.length;
    len=Math.floor((Math.random() * len) + 1);
    console.log(quotes[len]["text"]);
    return quotes[len]["text"];
  } catch (e) {
    console.error(e);
  }
};
getQuotes();
