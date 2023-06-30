import { useGlobalState } from "@/components/context";
import Head from "next/head";
import Filter from "./filter";
import Product from "./product";
import Sort from "./sort";

const Menu = () => {
  const {filter_products}= useGlobalState()
  return (
    <>
    <Head>
      <title>Menu</title>
    </Head>
      <div className="bg-white">
        <div>
          <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            <Sort />
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">Products</h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 xl:grid-cols-6">
                {/* <!-- Filters --> */}
                <div className="hidden lg:block">
                  <Filter />
                </div>
                {/* <!-- Product grid --> */}
                <div className="lg:col-span-4 xl:col-span-5">
                  {/* <!-- Your content --> */}
                  <Product ProductData = {filter_products} />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

    </>
  )
}

export default Menu;