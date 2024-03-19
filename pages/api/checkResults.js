// pages/api/checkResults.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { pais } = req.query;

        const response = await axios.get('https://check-api.checkmedia.org/api/v2/feeds', {
            params: {
                filter: {
                    type: 'text',
                    query: pais,
                    feed_id: 463
                }
            },
            headers: {
                'Accept': 'application/vnd.api+json',
                'X-Check-Token': '485a95148ad65fb84d9d6281f718953e',
                'Content-Type': 'application/json'
            }
        });

        // Verificar si hay datos en la respuesta
        if (!response.data.data || response.data.data.length === 0) {
            return res.status(500).json({ error: 'No se encontraron resultados' });
        }

        // Parsear la información en una cadena de texto
        const parsedText = response.data.data.map(item => {
            return `${item.id} - ${item.attributes.claim}\n- ${item.attributes['fact-check-title']}\n- ${item.attributes['fact-check-summary']}\n`;
        }).join('\n');

        return res.status(200).send(parsedText);
    } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error.message);
        return res.status(500).json({ error: 'Error al realizar la solicitud a la API' });
    }
}
