import { clienteMail } from './messageSenders/emailSender/index.js'
import { emailAdmin } from '../config.js';
import { loggerConsole } from '../config.js';

export const authServices = async ( req ) => {
    //await clienteMail.enviar({ asunto: 'Nuevo Registro', destinatario: emailAdmin, mensaje: req.body })
    loggerConsole.info("Mail Enviado al admin con el nuevo registro");
};