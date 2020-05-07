import React, { useEffect } from 'react'

export const Cart = ( props ) => {
    const cart = props.cart

    // let localCart = cart && localStorage.getItem( 'cart' ) ? JSON.parse( localStorage.getItem( 'cart' ) ) : []

    // const totaltems = cart.length
    useEffect( () => {

    }, [] )


    // console.log( "CART totalItems && subTotal", totaltems, props.totalPrice )

    return (
        <div className="cart__container">
            <div className="cart__list">
                {cart && cart.length > 0 ?
                    cart.map( cartItem => {
                        // console.log( cartItem )
                        return (
                            <div key={cartItem.id} className="cart__item">
                                <img src={cartItem.image} alt={cartItem.name} className="cart__img" />
                                <span className="cart__title">{cartItem.name}</span>
                                <button className="delete__item" onClick={() => props.removeCartItem( cartItem.id )}>X</button>
                                <hr></hr>
                                <div className="cart__total">
                                    <div className="cart__total_inner">
                                        Price
                                         <br />
                                        <span>
                                            {cartItem.price.amount.toFixed( 2 )}
                                            {cartItem.price.currency}/{cartItem.price.measureUnit}</span>
                                        <br />
                                     Quantity & SubTotal
                                        <span>
                                            {cartItem.quantity}{" "} {cartItem.price.measureUnit} {" "}
                                            {cartItem.subTotal}<span>
                                                {cartItem.price.currency}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    } )
                    : (
                        <span className="empty__cart">
                            <h3>CART  {cart.length === 0 ? "[0]" : ""}</h3>
                        </span>
                    )}
                <div className="total__amount">
                    <h4>
                        TOTAL{" "}
                        <span>
                            ${cart !== 0 && props.totalPrice ?
                                props.totalPrice.toFixed( 2 )
                                : null
                            }
                        </span>
                    </h4>
                </div>
            </div>
        </div>
    )
}
