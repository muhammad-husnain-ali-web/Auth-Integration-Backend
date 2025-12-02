import express from 'express'

import { addProduct, getProduct } from '../controllers/produtController.js'

const router = express.Router()


router.post('/', addProduct)

router.get('/', getProduct)

export default router