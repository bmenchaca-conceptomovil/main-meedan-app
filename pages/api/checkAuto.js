import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { param } = req.query;

        const imageFormatsRegex = /\.(jpeg|jpg|png|gif)$/i;
        const audioFormatsRegex = /\.(mp3|wav|flac|m4a)$/i;
        const videoFormatsRegex = /\.(mp4|avi|mkv|mov)$/i;
        const textFormatsRegex = /\.(txt|pdf|docx)$/i;

        if (imageFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo imagen.' };
            return res.status(210).json(message);
        } else if (audioFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo audio.' };
            return res.status(211).json(message);
        } else if (videoFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo video.' };
            return res.status(212).json(message);
        } else if (textFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo texto.' };
            return res.status(213).json(message);
        }

        return res.status(200).json("handlerAuto");
    } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error.message);
        return res.status(500).json({ error: 'Error al realizar la solicitud a la API' });
    }
}
