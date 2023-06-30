import { useGlobalState } from '@/components/context';
import OrderDetail from '../components/orderDetail';
import Link from 'next/link';

const RecentOrder = () => {
  const { RecentOrder } = useGlobalState()
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg">
          <div className='flex items-center mb-6'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-green-600">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
          </div>
          {RecentOrder && <OrderDetail RecentOrder={RecentOrder} />}
        </div>
        <Link href="/menu"><button className='m-4 text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded'>Continue Shopping</button>
        </Link>
      </div>
    </>
  )
}

export default RecentOrder