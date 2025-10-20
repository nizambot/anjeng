import axios from 'axios';

export default async function handler(req, res) {
  const body = await req.json();

  const response = await axios.get("https://api.github.com/repos/fressty/kampank/contents/token.json", {
    headers: {
      Authorization: "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"
    }
  });

  const sha = response.data.sha;
  const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
  const json = JSON.parse(content);

  json.tokens = json.tokens.filter(t => t !== body.token);
  const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');

  await axios.put("https://api.github.com/repos/fressty/kampank/contents/token.json", {
    message: "Menghapus token",
    content: updatedContent,
    sha: sha
  }, {
    headers: {
      Authorization: "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"
    }
  });

  res.status(200).json({ message: "Token deleted from GitHub" });
}
