import React from 'react'
import Card from '../UI/Card'
import ProductImage from './ProductImage'

const extendedProduct = ({ product }) => {
  return (
    <Card className="ext-product-item">
        <ProductImage image={product.image} />
        <div className='ext-product-item__description'>
            <h2>{product.name}</h2>
            <div className='ext-product-item__description-container'>
                <p>{product.description}</p>
            </div>
        </div>
        <div className="ext-product-item__button-container-main">
          <div className="ext-product-item__price">₪{product.price}</div>
          <div className="ext-product-item__button-container">
            <button>Add To Cart</button>
          </div>
        </div>
    </Card>
  )
}

export default extendedProduct