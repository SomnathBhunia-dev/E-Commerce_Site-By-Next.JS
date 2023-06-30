/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { useGlobalState } from "@/components/context"
import Stars from "../components/stars"
import FormatPrice from "../components/FormatPrice"
import { Loading } from "@/components/loading"
import ImageView from "../components/ImageView"
import Head from "next/head"


const SingleProduct = () => {
  const { SingleData, singleProduct, addToCart, addToFav, Favourite, dispatch, capitalize } = useGlobalState()
  const [pin, setpin] = useState('')
  const [ChooseColor, setChooseColor] = useState('')
  const [ChooseSize, setChooseSize] = useState('')
  const [service, setservice] = useState(null)
  const [loading, setLoading] = useState(true)
  const checkPin = () => {
    setservice(true)
  }

  const router = useRouter()
  const query = router.query.singleproduct
  const id = query?.split("=").pop();

  const { brand, category, images, description, discountPercentage, thumbnail, price, rating, title, colors, size, } = singleProduct

  useEffect(() => {
    SingleData(id);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [id]);

  const handleClick = () => {
    if (colors && colors.length !== 0 && !ChooseColor) {
      dispatch({ type: "ALERT", payload: { massage: "Choose Color First", type: "danger" } })
      return;
    }
    if (size && size.length && !ChooseSize) {
      dispatch({ type: "ALERT", payload: { massage: "Choose Size First", type: "danger" } })
      return;
    }
    else {
      const addedProduct = {
        id: title + ChooseColor + ChooseSize,
        ProductCode: id,
        title: title,
        brand: brand,
        thumbnail: thumbnail,
        price: price,
        color: ChooseColor,
        size: ChooseSize,
        discount: discountPercentage,
        Qty: 1
      }
      addToCart(addedProduct)
    }
  }
  return (
    <>
    <Head>
      <title>HusHas | {capitalize(title)}</title>
    </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className={`lg:w-4/5 mx-auto overflow-hidden flex flex-wrap ${loading ? "opacity-20" : "opacity-100"}`}>
            <ImageView image={thumbnail} images={images} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="flex relative right-0 justify-end">
                <span className="bg-[#dc3545] text-[#fff] text-center left-8 relative top-2 rotate-[40deg] w-40 lg:block hidden"> {capitalize(category)} </span>
              </div>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{capitalize(brand)}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{capitalize(title)}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <Stars Rating={rating} />
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>

              </div>
              <p className="leading-relaxed">{capitalize(description)}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {colors && colors.length !== 0 && <div className="flex">
                  <span className="mr-3">Color</span>
                  {colors && colors.map((i, index) => (
                    <button key={index} className={`border-2 ml-1 border-gray-300 rounded-full w-6 h-6 focus:outline-none ${ChooseColor === i ? 'opacity-100' : 'opacity-75'}`} style={{ backgroundColor: `${i}` }} onClick={() => setChooseColor(i)}>
                      {ChooseColor === i ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative bottom-0.5 right-0.5 h-6 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg> : ''}
                    </button>
                  ))}
                </div>}
                {size && size.length &&
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" onClick={(e) => setChooseSize(e.target.value)}>
                        {size && size.map((i, index) => (<option key={index}>{i}</option>))}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>}
              </div>
              <div className="flex">
                <div className="flex items-center flex-col md:flex-row">
                  <span className="title-font font-medium text-2xl text-gray-900"><FormatPrice price={price} /></span>
                  <span className="text-green-400 text-sm mx-2">({discountPercentage} % off)</span>
                </div>
                <button className=" ml-auto text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleClick}>Add To Cart</button>
                <button onClick={() => addToFav(singleProduct)} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    className={`w-5 h-5 ${Favourite?.some((i) => i.id === singleProduct.id) ? 'text-purple-800' : ''} `} viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pincode flex space-x-4  mt-4">
                <input type="number" className="border border-gray-500 rounded-md p-1" placeholder="Check Availability" onChange={(e) => { setpin(e.target.value) }} />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md" onClick={checkPin}>Check</button>
              </div>
              {(service !== null) ? <div className={`${service ? "text-purple-500" : "text-red-500"} text-sm`}>{service ? "Delivery with in 4 Days" : "We are no Serviceable in Your PinCode"}</div> : ''
              }
            </div>
          </div>
          {loading && <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"><Loading /></div>}
        </div>
      </section>
    </>
  )
}

export default SingleProduct