import { Router } from 'express'
import {createSede, deleteSede, getSede, getSedes, updateSede} from '../controllers/corte.controller.js'


const router = Router()

router.get('/sede', getSede)

router.get('/sede/:id', getSedes)

router.post('/sede', createSede)

router.patch('/sede/:id', updateSede)

router.delete('/sede/:id', deleteSede)

export default router