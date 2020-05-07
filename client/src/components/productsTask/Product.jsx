import React, { useState } from 'react'

export const Product = ( props ) => {
    const product = props.product
    const { amount, currency, measureUnit } = product.price
    const [quantity, setQuantity] = useState( props.quantity )

    const updateQty = ( e ) => {
        let val = parseInt( e.target.value, 10 )
        setQuantity( val )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            subTotal: 0
        }
        item.subTotal = item.quantity * item.price.amount
        props.addToCart( item )
        setQuantity( props.quantity )
    }

    // const resetQuantity = () => {
    //     setQuantity( null )
    // }

    // console.log( "PRODUCT PROPS", props )


    return (
        <div key={product.id} className="product__card">
            <figure>
                <img src={product.image} alt={product.name} />
            </figure>
            <div className="product__info">
                <h4>{product.name}</h4>
                <div className="price__info">
                    <br />
                    <span>
                        {amount * quantity.toFixed( 2 )}{" "}
                        <span>{currency}/{measureUnit}</span>
                    </span>
                </div>
            </div>
            <div className="stepper__input">
                <button className="decrement"
                    onClick={() => setQuantity( quantity - 1 )}
                >
                    –
        </button>
                <input
                    type="number"
                    id={`id ${product.id}`}
                    className="quantity"
                    min="0"
                    max="5"
                    value={quantity}
                    onChange={updateQty}

                />
                <button className="increment"
                    onClick={() => setQuantity( quantity + 1 )}
                >
                    +
        </button>
            </div>
            <div className="btn__row">
                <button type="submit" className="add__btn"
                    onClick={handleSubmit}
                >
                    ADD To CART
                </button>
            </div>
        </div>
    )
}


