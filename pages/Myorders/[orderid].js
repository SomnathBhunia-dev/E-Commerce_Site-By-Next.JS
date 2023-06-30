import Head from "next/head"
import { useRouter } from "next/router"
import { useGlobalState } from "@/components/context"
import OrderDetail from "@/components/orderDetail"

const OrderId = () => {
    const { MyOrders } = useGlobalState()
    const router = useRouter()
    const query = router.query.orderid
    const id = query?.split("=").pop();

    const findOrder = (id) => {
        const matchOrder = MyOrders.find((i) => i.Order_id === id)
        return matchOrder
    }
    const order = findOrder(id)
    return (
        <>
        <Head>
            <title>HusHas | Your Orders</title>
        </Head>
            <OrderDetail RecentOrder={order} />
        </>
    )
}

export default OrderId