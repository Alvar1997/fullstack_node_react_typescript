import { NextFunction, Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await Product.findAll({
        order: [
            ['price', 'DESC']
        ]
    })
    res.json({ data: products })
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({ error: 'Product not found' })
        return
    }

    res.json({ data: product })
}


export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const product = await Product.create(req.body)
    res.status(201).json({ data: product })
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({ error: 'Product not found' })
        return
    }

    //Actualizamos el producto
    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({ error: 'Product not found' })
        return
    }

    //Actualizamos el producto
    product.availability = !product.availability
    await product.save()

    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    console.log('deleteProduct')
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({ error: 'Product not found' })
        return
    }

    await product.destroy()
    res.json({ data: 'Producto Eliminado' })
}