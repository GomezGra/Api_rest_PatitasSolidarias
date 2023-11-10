import {Router} from 'express';
import {mascota} from './controller.js';

export const router = Router()

router.get('/mascotas', mascota.getAll);

//Tipo de solicitud para insertar usamos post
router.post('/mascota', mascota.add);

//Solicitud para eliminar
//router.delete('/mascota', mascota.delete);

//Solicitud para modificar
router.put('/mascota', mascota.update);

//Solicitud para mostrar una mascota según su id
router.get('/mascota', mascota.getOne);

//Solicitud para eliminar según Id
router.delete('/mascotaID', mascota.deleteId);