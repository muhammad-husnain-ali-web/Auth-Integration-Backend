import express from 'express'

import { addProduct, getProduct, getProductByCategory, getProductByName } from '../controllers/produtController.js'

const router = express.Router()


router.post('/', addProduct)

router.get('/', getProduct)

router.get('/:name', getProductByName)

router.get('/category/:category', getProductByCategory)

export default router