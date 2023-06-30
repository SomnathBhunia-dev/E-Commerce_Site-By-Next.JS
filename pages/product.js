
import Link from "next/link"
import { useGlobalState } from "@/components/context"
import { Loading } from "@/components/loading"
import FormatPrice from "@/components/FormatPrice"
import InfiniteScroll from "react-infinite-scroll-component"
import Image from "next/image"
import FilterBar from "./FilterBar"

const Product = ({ProductData}) => {
  const { page, fetchMoreData, capitalize } = useGlobalState()

  return (
    <>
      <InfiniteScroll
        dataLength={30 * page} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={page < 4}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        <section className="text-gray-600 body-font">
          <div className="container px-1 py-4 mx-auto overflow-hidden">
            <FilterBar />
            {ProductData && ProductData.length !== 0 ?
              <div className="flex flex-wrap -m-4 justify-center">
                {ProductData.slice(0, page * 30).map((i) => (
                  <div className="p-4 w-64 shadow-lg m-4" key={i.id}>
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image alt="ecommerce" className="object-contain object-top w-full h-full block"
                        src={i.thumbnail}
                        width={500} height={500} />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{i.category}</h3>
                      <Link href={`/productId=${i.id}`} ><h2 className="text-gray-900 title-font text-lg font-medium">{capitalize(i.title)}</h2> </Link>
                      <p className="mt-1 font-bold text-amber-900"><FormatPrice price={i.price} />
                        <span className="text-green-400 text-sm mx-2">({i.discountPercentage} % off)</span></p>
                    </div>
                  </div>
                ))}
              </div>
              : 'Empty'}
          </div>
        </section>
      </InfiniteScroll>
    </>
  )
}

export default Product