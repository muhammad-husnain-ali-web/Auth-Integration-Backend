import express from 'express'

import { addProduct, getProduct, getProductByCategory } from '../controllers/produtController.js'

const router = express.Router()


router.post('/', addProduct)

router.get('/', getProduct)

router.get('/:category', getProductByCategory)

export default router