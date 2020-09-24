import React, { useState, useEffect } from 'react'
import jsonData from '../../data/products.json'
import { Product } from './Product'
import { Cart } from './Cart'
// import { EventHandlers } from './EventHandlers'


export const ProductsList = () => {
    const [products, setProducts] = useState( [] )
    const [cart, setCart] = useState( [] )
    const [quantity, setQuantity] = useState( 1 )
    const [totalPrice, setTotalPrice] = useState( 0 )


    useEffect( () => {
        const data = jsonData.products
        setProducts( data )
        // console.log( data, "data" )
        localStorage.setItem( 'cart', JSON.stringify
            ( cart ) )
    }, [cart] )


    const addToCart = ( item ) => {
        let productId = item.id
        let tempCart = [...cart]
        // let productQty = item.quantity
        if ( checkProduct( productId ) ) {
            // let index = tempCart.findIndex( x => x.id === productId )
            let index = -1
            for ( let i = 0; i < tempCart.length; i++ ) {
                if ( tempCart[i].id === productId ) {
                    index = i
                }
            }
            tempCart[index].quantity += item.quantity
            tempCart[index].subTotal += item.subTotal
            // tempCart[index].quantity += Number( tempCart[index].quantity ) + Number( productQty )

            setCart( tempCart )
            setQuantity( tempCart[index].quantity )

        } else {
            setCart( cart => [...cart, item] )
        }
        setTotalPrice( totalPrice => totalPrice + item.subTotal )
    }


    const removeCartItem = ( id ) => {
        const filtered = [...cart]
        let index = -1
        console.log( filtered, "filtered" )
        for ( let i = 0; i < filtered.length; i++ ) {
            if ( filtered[i].id === id ) {
                index = i
            }
        }
        // console.log( filtered[index].subTotal, "index of filtered" )
        // setTotalPrice( totalPrice => totalPrice - filtered[index].subTotal )
        setTotalPrice( totalPrice - filtered[index].subTotal )
        filtered.splice( index, 1 )
        setCart( filtered )
    }

    const checkProduct = ( productId ) => {
        let tempCart = cart
        return tempCart.some( function ( item ) {
            return item.id === productId
        } )
    }





    return (
        <div className="container">
            <div className="main__wrapper">
                <main className="main">
                    <h2>PRODUCTS</h2>
                    <div className="products__list">
                        {products.map( product => {
                            return <Product
                                key={product.id}
                                product={product}
                                quantity={quantity}
                                addToCart={addToCart}
                            />
                        } )}
                    </div>
                </main>
                <aside className="aside">
                    <h2>MY CART</h2>
                    <Cart
                        cart={cart}
                        quantity={quantity}
                        totalPrice={totalPrice}
                        removeCartItem={removeCartItem}
                    />
                </aside>
            </div>
        </div>
    )
}
