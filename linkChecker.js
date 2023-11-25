import axios from 'axios';
import cheerio from 'cheerio';

const getLinks = async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const links = [];
    $('a').each((index, element) => {
        links.push($(element).attr('href'));
    });

    return links;
};

const checkLinks = async (url) => {
    const links = await getLinks(url);
    const brokenLinks = [];

    for (const link of links) {
        try {
            const response = await axios.get(link);
            console.log(link);
            if (response.status === 404) {
                brokenLinks.push(link);
            }
        } catch (error) {
            // brokenLinks.push(link);
        }
    }

    return brokenLinks;
};

export default checkLinks;
