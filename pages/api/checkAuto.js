import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { param } = req.query;

        const imageFormatsRegex = /\.(jpeg|jpg|png|gif)$/i;
        const audioFormatsRegex = /\.(mp3|wav|flac|m4a)$/i;
        const videoFormatsRegex = /\.(mp4|avi|mkv|mov)$/i;
        const textFormatsRegex = /\.(txt|pdf|docx)$/i;

        const paisesAmericas = [
            "Argentina", "Bolivia", "Brasil", "Canadá", "Chile", "Colombia", "Costa Rica", "Cuba", "Dominica", "Ecuador",
            "El Salvador", "Estados Unidos", "Granada", "Guatemala", "Guyana", "Haití", "Honduras", "Jamaica", "México",
            "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana", "San Cristóbal y Nieves", "San Vicente y las Granadinas",
            "Santa Lucía", "Surinam", "Trinidad y Tobago", "Uruguay", "Venezuela", "Antigua y Barbuda", "Bahamas", "Barbados",
            "Belice", "Dominica", "Grenada", "Guyana", "Haití", "Jamaica", "Saint Kitts y Nevis", "Santa Lucía", "San Vicente y las Granadinas",
            "Surinam", "Trinidad y Tobago", "Uruguay", "Venezuela", "México", "Mexico", "Estados Unidos Mexicanos", "Estados Unidos", "EEUU", "EUA"
        ];

        const pais = param.toLowerCase();

        if (imageFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo imagen.' };
            return res.status(210).json(message);
        } else if (audioFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo audio.' };
            return res.status(211).json(message);
        } else if (videoFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo video.' };
            return res.status(212).json(message);
        }
        else if (validarPais(pais)) {
            const message = { success: `El parámetro contiene el nombre de un país: ${param}` };
            return res.status(214).json(message);
        }
        else if (textFormatsRegex.test(param)) {
            const message = { error: 'El archivo es de tipo texto.' };
            return res.status(213).json(message);
        }

        return res.status(200).json("handlerAuto");
    } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error.message);
        return res.status(500).json({ error: 'Error al realizar la solicitud a la API' });
    }
}

function validarPais(pais) {
    const paisLowerCase = pais.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return paisesAmericas.includes(paisLowerCase);
}

