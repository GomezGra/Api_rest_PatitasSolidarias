import {Router} from 'express';
import {mascota} from './controller.js';

export const router = Router()

router.get('/mascotas', mascota.getAll);

//Tipo de solicitud para insertar usamos post
router.post('/mascota', mascota.add);

//Solicitud para eliminar
router.delete('/mascota', mascota.delete);

//Solicitud para modificar
router.put('/mascota', mascota.update);

//Solicitud para mostrar un libro según su id
router.get('/mascota', mascota.getOne);

//Solicitud para eliminar según ISBN
router.delete('/mascotaID', mascota.deleteId);