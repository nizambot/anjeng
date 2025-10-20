import axios from 'axios';

export default async function handler(req, res) {
  const response = await axios.get("https://api.github.com/repos/fressty/kampank/contents/token.json", {
    headers: {
      Authorization: "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"
    }
  });
  const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
  const json = JSON.parse(content);
  res.status(200).json(json.tokens || []);
}
