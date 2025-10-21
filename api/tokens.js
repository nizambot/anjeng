import axios from 'axios';

export default async function handler(req, res) {
  const response = await axios.get("https://api.github.com/repos/nizambot/security/contents/tokendatabase.json", {
    headers: {
      Authorization: "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"
    }
  });
  const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
  const json = JSON.parse(content);
  res.status(200).json(json.tokens || []);
}
