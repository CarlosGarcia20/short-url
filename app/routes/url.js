import { Router } from "express";
import { UrlController } from "../controllers/url.js";

export const urlRoutes = Router();

urlRoutes.get('/shorten/:shortCodeUrl', UrlController.getOriginalUrl)

urlRoutes.get('/shorten/:shortCodeUrl/stats', UrlController.GetUrlStatistics)

urlRoutes.post('/shorten', UrlController.createShortUrl)

urlRoutes.put('/shorten/:shortCodeUrl', UrlController.updateUrl);

urlRoutes.delete('/shorten/:shortCodeUrl', UrlController.deleteUrl)