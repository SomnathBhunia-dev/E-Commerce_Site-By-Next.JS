/* eslint-disable @next/next/no-img-element */
import { useGlobalState } from "@/components/context"
import FormatPrice from "@/components/FormatPrice"
import Image from "next/image"
import Link from "next/link"

const MyOrders = () => {
  const { MyOrders } = useGlobalState()

  const Dateformate = (e) => {
    const orderDate = new Date(e);
    const day = orderDate.getDate();
    const month = orderDate.toLocaleString("en-US", { month: "short" });
    const year = orderDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };
  
  return (
    <div className="">
      {MyOrders.length === 0 ?
        <div className='flex flex-col items-center'>
          <img className=" w-4/5 md:w-1/2" src="https://sarivillafashion.com/img/images/listing-5/empty-cart.gif" alt="" />
          <Link href="/menu"><button className=' m-4 text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded'>Continue Shopping</button></Link>
        </div>
        :
        <>
        <h2 className="text-center font-bold text-3xl p-4">Your Orders</h2>
          {MyOrders.map((i) => (
            <div key={i.Order_id} className="container w-full md:w-[95%] h-min border md:mt-8 m-auto rounded-lg">
              <div className="max-md:hidden">
                <div className="flex justify-between h-1/4 p-4 pb-0 border-b-2 bg-[#F0F2F2]">
                  <div className="flex justify-around md:max-lg:w-1/2 lg:w-1/3">
                    <div>Order Placed <p className="font-bold">{Dateformate(i.Order_Date)}</p></div>
                    <div>Order Total <p className="ml-2 font-bold"><FormatPrice price={i.Order_amount} /></p></div>
                    <div className="relative" data-te-dropdown-ref>
                      <div className="cursor-pointer group">
                        <span className="w-2"> Ship To
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 inline-block">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </span> <p className="cursor-pointer text-[#007185]">{i.Order_address[0].firstName} </p>
                        <div className="absolute top-12 z-[1000] hidden float-left m-0 p-4 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 group-hover:block" >
                          <span className="font-bold text-gray-800"> {i.Order_address[0].firstName} {i.Order_address[0].lastName} </span>
                          <div className="text-gray-600 mb-1">
                            <p>{i.Order_address[0].road}</p>
                            <p> {i.Order_address[0].District}, {i.Order_address[0].State} - {i.Order_address[0].Pin}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    Order Id :  {i.Order_id}
                  </div>
                </div>
                <h2 className="p-8 font-bold text-3xl text-green-500">Arriving in Next 2 Days</h2>
                <div className='flex h-full'>
                  <div className="w-4/5 justify-center flex flex-col border-r-2 border-t-2">
                    {i.item.map((item, index) => (
                      <div key={index} className={`flex items-center p-4 ${index < i.item.length - 1 && 'border-b-2'}`}>
                        <div className="mr-4 w-24 flex-shrink-0 overflow-hidden ">
                          <Image src={item.thumbnail} width={100} height={100} alt="product-image" className="w-full rounded-lg sm:w-24 object-cover object-center" />
                        </div>
                        <div>
                          <h2 className="text-xl text-[#007185] hover:underline"><Link href={`/productId=${item.ProductCode}`}>{item.title}</Link></h2>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-1/5 flex flex-col">
                    <Link href={`/Myorders/orderid=${i.Order_id}`}>
                      <div className=' m-4 text-white text-center bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded'>
                        Order Details
                      </div>
                    </Link>
                    <button disabled className=' m-4 text-white bg-indigo-300 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none rounded'>Track Delivery</button>
                  </div>
                </div>
              </div>
              <div className="h-min m-auto rounded-lg md:hidden">
                {i.item.map((item, index) => (
                  <div key={index} className={`flex items-center p-4 ${index < i.item.length - 1 && 'border-b-2'}`}>
                    <Link href={`/Myorders/orderid=${i.Order_id}`}>
                      <div className="flex items-center">
                        <div className="mr-4 w-24 flex-shrink-0 overflow-hidden ">
                          <Image src={item.thumbnail} width={100} height={100} alt="product-image" className="w-full rounded-lg sm:w-24 object-cover object-center" />
                        </div>
                        <div>
                          <h2 className="font-bold text-green-500">Arriving in Next 2 Days</h2>
                        </div>
                        <div className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      }
    </div >
  )
}

export default MyOrders