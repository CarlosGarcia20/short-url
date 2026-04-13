import Url from "../models/url.js";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6)


export class UrlController {
    static async createShortUrl(req, res) {
        try {
            const { originalURL } = req.body;
            
            if (!originalURL) {
                return res.status(400).json({ message: "La URL original es obligatoria" });
            }
    
            let shortCodeUrl = nanoid(6)
    
            let validateCode = await Url.findOne({shortCode: shortCodeUrl})
    
            while (validateCode) {
                shortCodeUrl = nanoid(6);
                validateCode = await Url.findOne({ shortCode: shortCodeUrl });
            }
            
            const newUrl = await Url.create({
                originalUrl: originalURL,
                shortCode: shortCodeUrl
            });

            return res.status(201).json({
                message: "Url creada con éxito",
                data: newUrl
            });

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
    static async getOriginalUrl(req, res) {
        try {
            const { shortCodeUrl } = req.params;
            
            const urlData = await Url.findOneAndUpdate(
                { shortCode: shortCodeUrl },
                { $inc: { accessCount: 1 }},
                { returnDocument: 'after' }
                
            )

            if(!urlData) return res.status(404).json({ message: "URL no encontrada" })

            return res.status(200).json({
                data: {
                    id: urlData._id,
                    url: urlData.originalUrl,
                    shortCode: urlData.shortCode,
                    createdAt: urlData.createdAt,
                    updatedAt: urlData.updatedAt
                }
            });

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
    static async updateUrl(req, res) {
        try {
            const { shortCodeUrl } = req.params;
            const { newUrl } = req.body;

            if (!newUrl) return res.status(400).json({ message: "La URL es obligatoria" })
            
            const data = await Url.findOneAndUpdate(
                { shortCode: shortCodeUrl },
                { originalUrl: newUrl },
                { returnDocument: 'after' }
            );

            if (!data) {
                return res.status(404).json({ message: "URL no encontrada" });
            }

            return res.status(200).json({
                message: "Url actualizada con éxito",
                data: {
                    id: data._id,
                    url: data.originalUrl,
                    shortCode: data.shortCode,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
    static async deleteUrl(req, res) {
        try {
            const { shortCodeUrl } = req.params;

            const data = await Url.deleteOne({ shortCode: shortCodeUrl });
            
            if(data.deletedCount !== 1) {
                return res.status(404).json({ message: "URL no encontrada" });
            }

            return res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
    static async GetUrlStatistics(req, res) {
        try {
            const { shortCodeUrl } = req.params;

            const dataUrl = await Url.findOne({ shortCode: shortCodeUrl });

            if(!dataUrl) return res.status(404).json({ message: "URL no encontrada" });

            return res.status(200).json({ data: dataUrl })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}