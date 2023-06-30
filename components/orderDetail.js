import FormatPrice from "@/components/FormatPrice"
import Image from "next/image"

const OrderDetail = ({ RecentOrder }) => {
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-lg rounded-lg px-6 py-8">
                    <div className='flex justify-between flex-col md:flex-row'>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Order Details</h2>
                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Order ID:</span> {RecentOrder?.Order_id}
                            </p>
                            <h2 className="text-xl font-bold mt-2">Delivery Address</h2>
                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold text-purple-600">Name: {RecentOrder?.Order_address[0].firstName} {RecentOrder?.Order_address[0].lastName}</span>
                            </p>
                            <div className="text-gray-600 mb-1">
                                <span className="font-bold text-gray-800">
                                    <p> Address: {RecentOrder?.Order_address[0].road}, </p>
                                    <p>{RecentOrder?.Order_address[0].District}, {RecentOrder?.Order_address[0].State} - {RecentOrder?.Order_address[0].Pin}</p>
                                </span>
                            </div>
                        </div>
                        <div className="w-80">
                            <h2 className="text-xl font-bold mb-6">Your Ordered Items</h2>
                            <ol role="list" className="my-6 divide-y divide-gray-200 mr-4">
                                {RecentOrder?.item.map((i) => (
                                    <li className="flex py-6 items-center" key={i.id}>
                                        <div className=" flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-800">
                                                    <h3> {i.title}</h3>
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
                                            </div>
                                        </div>
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <Image src={i.thumbnail} width={100} height={100} alt={i.title} className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div>
                                        <p className="ml-4"><FormatPrice price={i.price} /></p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="mt-6 h-full rounded-lg bg-white md:mt-0 md:w-1/3">
                            <h2 className="text-xl font-bold mb-6">You Paid The Amount</h2>
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700"><FormatPrice price={RecentOrder?.Order_amount - RecentOrder?.fee} /></p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Shipping</p>
                                <p className="text-gray-700"><FormatPrice price={RecentOrder?.fee} /></p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total Order Amount</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold"><FormatPrice price={RecentOrder?.Order_amount} /> USD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail