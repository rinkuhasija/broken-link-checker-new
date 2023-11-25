// pages/api/checkLinks.js
import checkLinks from '../../../linkChecker';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const brokenLinks = await checkLinks(url);
  return res.status(200).json({ brokenLinks });
}
