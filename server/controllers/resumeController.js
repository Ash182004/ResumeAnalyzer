const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');


const mailboxId = '119948';
const apiKey = '436f63f72e9ed7116fb724e08cf48644bad9e7fc';

exports.analyzeResume = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const uploadResponse = await axios.post(
      `https://api.parseur.com/v1/mailboxes/${mailboxId}/documents/base64_upload/`,
      {
        file_name: file.originalname,
        file_content: fs.readFileSync(file.path, { encoding: 'base64' })
      },
      {
        headers: {
          Authorization: `Token ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const documentId = uploadResponse.data.id;
    let attempts = 0;
    let parsedData = null;

    while (attempts < 10) {
      const statusResponse = await axios.get(
        `https://api.parseur.com/v1/documents/${documentId}/results/parsed`,
        {
          headers: { Authorization: `Token ${apiKey}` }
        }
      );

      if (
        statusResponse.data?.results?.length &&
        statusResponse.data.results[0].parsed_data
      ) {
        parsedData = statusResponse.data.results[0].parsed_data;
        break;
      }

      await new Promise(r => setTimeout(r, 3000));
      attempts++;
    }

    if (!parsedData) {
      return res.status(408).json({ error: 'Timeout waiting for Parseur to process document' });
    }

    return res.json({
      success: true,
      extractedEntities: parsedData
    });

  } catch (error) {
    console.error('Error analyzing resume:', error.message);
    res.status(500).json({ error: error.message });
  }
};
