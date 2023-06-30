/* eslint-disable @next/next/no-img-element */
import { useGlobalState } from "@/components/context"
import FormatPrice from "@/components/FormatPrice"
import Image from "next/image"
import Link from "next/link"
import Address from '../components/address'

const Cart = () => {
  const { Cart, removeCart, HandleDec, HandleInc, total_Price, shipFee, Sub_Total, makePayment } = useGlobalState()

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-20">
        {!Cart.length
          ?
          <div className='flex flex-col items-center'>
            <img className=" w-4/5 md:w-1/2" src="https://sarivillafashion.com/img/images/listing-5/empty-cart.gif" alt="" />
            <Link href="/menu"><button className=' m-4 text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded'>Continue Shopping</button></Link>
          </div>
          :
          <>
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <Address />
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {Cart?.map((i) => (
                  <div key={i.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <Image src={i.thumbnail} width={100} height={100} alt="product-image" className="h-24 w-24 rounded-lg sm:w-40 flex-shrink-0 overflow-hidden object-cover object-center" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <Link href={`/productId=${i.ProductCode}`}>
                        <h2 className="text-lg font-bold text-gray-900 hover:underline">{i.title}</h2>
                        </Link>
                        <div className="flex md:flex-col justify-between">
                          {i.color !== '' ?
                            <p className="flex items-center">Color : <span className=' ml-1 rounded-full w-4 h-4 inline-block opacity-100' style={{ backgroundColor: `${i.color}` }}></span></p>
                            : ''}
                          {i.size !== '' ?
                            <p className="flex items-center md:mt-8">Size : {i.size} </p>
                            : ''}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => HandleDec(i.id)}> - </span>
                          <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="text" value={i.Qty} min="1" readOnly />
                          <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => HandleInc(i.id)}> + </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm"><FormatPrice price={i.price} /></p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => { removeCart(i) }}>
                            <path strokeLinecap="round" strokeinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <!-- Sub total --> */}
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700"><FormatPrice price={total_Price} /></p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700"><FormatPrice price={shipFee} /></p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold"><FormatPrice price={Sub_Total} /> USD</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                  </div>
                </div>
                <button onClick={() => makePayment()} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Make Payment</button>
              </div>
            </div>
          </>}
      </div>
    </>
  )
}

export default Cart;

export const NavCart = ({ toggle }) => {
  const { Cart, removeCart, clearCart } = useGlobalState()
  return (
    <>
      <h4 className="font-bold text-black text-center">Shopping Cart</h4>
      {Cart?.length !== 0 ?
        <div>
          <ol role="list" className="my-6 divide-y divide-gray-200 mx-4">
            {Cart.map((i) => (
              <li className="flex py-6" key={i.id}>
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={i.thumbnail} alt={i.title} className="h-full w-full object-cover object-center" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-800">
                      <h3> {i.title}</h3>
                      <p className="ml-4"><FormatPrice price={i.price} /></p>
                    </div>
                    <p className="mt-1 text-sm text-gray-800 font-bold">{i.brand}</p>
                    <div className="flex justify-between">
                      {i.color !== '' ?
                        <p className="flex items-center">Color : <span className=' ml-1 rounded-full w-4 h-4 inline-block opacity-100' style={{ backgroundColor: `${i.color}` }}></span></p>
                        : ''}
                      {i.size !== '' ?
                        <p className="flex items-center">Size : {i.size} </p>
                        : ''}
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-900">Qty {i.Qty}</p>
                    <div className="flex">
                      <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => { removeCart(i) }}>Remove</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="mt-6">
              <Link href={'/cart'} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={() => toggle(false)}>Checkout</Link>
            </div>
            <div className="flex justify-around">
              <button className="text-red-500" onClick={() => clearCart()}>Clear Cart</button>
              |
              <Link href={'/favourite'}><button className="text-[#007185]">Add from Favourite items</button></Link>
            </div>
          </div>
        </div>
        :
        <div className="flex justify-center items-center flex-col">
          <p className="text-white font-bold py-20">Your cart is Empty</p>
          <Link href={'/favourite'}>
            <button className="text-purple-800 border border-purple-800 rounded p-2 text-center mt-2 md:mt-11 hover:bg-white hover:border-none">ADD ITEMS FROM WISHLIST</button></Link>
        </div>
      }
    </>
  )
}
