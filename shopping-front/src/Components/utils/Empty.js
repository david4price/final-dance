import React from 'react'
import Card from '../UI/Card'
import '../Product/Product.css'

const Empty = () => {
  return (
    <Card>
        <div className='product-item__description'>
            <h2>Looks like there is nothing here :/</h2>
        </div>
    </Card>
  )
}

export default Empty