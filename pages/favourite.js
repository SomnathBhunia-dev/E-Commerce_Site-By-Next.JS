/* eslint-disable @next/next/no-img-element */
import { useGlobalState } from "@/components/context"
import Link from "next/link"

const Favourite = () => {
  const { Favourite, addToFav } = useGlobalState()
  return (
    <>
      <section className="text-gray-600 body-font">
        {!Favourite.length
          ?
          <div className='flex flex-col items-center'>
            <img className=" w-4/5 md:w-1/2" src="https://sarivillafashion.com/img/images/listing-5/empty-cart.gif" alt="" />
            <Link href="/product"><button className=' m-4 text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded'>Continue Shopping</button></Link>
          </div>
          :
          <>
            <h1 className="text-purple-700 text-center font-bold ">Your Favourite collection items</h1>
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center">
                {Favourite.map((i) => (
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg m-4 group" key={i.id}>
                    <a className="block relative h-48 rounded overflow-hidden">
                      <img alt="ecommerce" className="object-contain object-top w-full h-full block" src={i.thumbnail} />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{i.category}</h3>
                      <Link href={`/productId=${i.id}`} ><h2 className="text-gray-900 title-font text-lg font-medium">{i.title}</h2> </Link>
                      <p className="mt-1 font-bold text-amber-900">${i.price}
                        <span className="text-green-400 text-sm mx-2">({i.discountPercentage} % off)</span></p>
                    </div>
                    <div className="mt-2 text-center hidden group-hover:block">
                      <button onClick={() => { addToFav(i) }} className="px-10 py-2 text-white font-bold bg-red-500 hover:bg-white hover:text-red-500 hover:border hover:border-red-500  rounded" >Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        }
      </section>
    </>
  )
}

export default Favourite