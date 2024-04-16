// pages/api/checkAudio.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { audioUrl } = req.query;

        const response = await axios.get('https://check-api.checkmedia.org/api/v2/feeds', {
            params: {
                filter: {
                    type: 'audio',
                    query: audioUrl,
                    feed_id: 1090
                }
            },
            headers: {
                'Accept': 'application/vnd.api+json',
                'X-Check-Token': process.env.API_KEY,
                'Content-Type': 'application/json'
            }
        });


        const audioFormatsRegex = /\.(mp3|wav|flac|m4a)$/i;

        if (!audioFormatsRegex.test(imageUrl)) {
            const errorResponse = { error: 'La URL no corresponde a un audio, formato inválido' };
            return res.status(501).json(errorResponse);
        }

        if (!response.data.data || response.data.data.length === 0) {
            return res.status(500).json({ error: 'No se encontraron resultados' });
        }

        const parsedText = response.data.data.map(item => {
            return `${item.attributes.claim}\n- ${item.attributes['fact-check-title']}\n- ${item.attributes['fact-check-summary']}\n`;
        }).join('\n');

        return res.status(200).json(parsedText);
    } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error.message);
        return res.status(500).json({ error: 'Error al realizar la solicitud a la API' });
    }
}
