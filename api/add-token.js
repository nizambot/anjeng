import axios from 'axios';

export default async function handler(req, res) {
  const body = await req.json();

  const response = await axios.get("https://api.github.com/repos/nizambot/security/contents/tokendatabase.json", {
    headers: {
      Authorization: "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"
    }
  });

  const sha = response.data.sha;
  const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
  const json = JSON.parse(content);

  if (!json.tokens.includes(body.token)) {
    json.tokens.push(body.token);
  }

  const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');

  await axios.put("https://api.github.com/repos/nizambot/security/contents/tokendatabase.json", {
    message: "Menambahkan token baru",
    content: updatedContent,
    sha: sha
  }, {
    headers: {
      Authorization: "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"
    }
  });

  res.status(200).json({ message: "Token added to GitHub" });
}
  
