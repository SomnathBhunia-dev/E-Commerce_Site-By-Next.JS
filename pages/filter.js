import { useGlobalState } from "@/components/context";
import FormatPrice from "@/components/FormatPrice";
import Option from "@/components/Option";
import { useRef, useState } from "react";

const Filter = () => {
    const [arrowOpen, setarrowOpen] = useState(false);

    const { toggleCart, filterTag, clearFilterTag, FilterTag: { text, price, minPrice, maxPrice, } } = useGlobalState()

    const toggleCategory = () => {
        setarrowOpen((prevState) => !prevState);
    };

    const colorBtn = useRef()
    return (
        <>
            <div className="max-lg:p-2 sticky lg:top-[12.8rem]">
                <h3 className="sr-only">Categories</h3>

                <div className="flex flex-col items-center">
                    <label htmlFor="voice-search" className="sr-only">Search</label>
                    <div className="relative w-4/5">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" name="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search items...." required value={text} onChange={filterTag} />
                    </div>
                </div>

                <form >
                    <Option topic={"category"} />
                    <Option topic={"brand"} />
                    <div className="border-b border-gray-200 py-6" >
                        <h3 className="-my-3 flow-root">
                            {/* <!-- Expand/collapse section button --> */}
                            <button type="button" disabled className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                <span className="font-medium text-gray-900">Color</span>
                                <span className="ml-6 flex items-center" onClick={() => { toggleCart(colorBtn); toggleCategory() }}>
                                    {!arrowOpen ?
                                        (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                        </svg>)
                                        :
                                        // {/* <!-- Collapse icon, show/hide based on section open state. --> */ }
                                        (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                        </svg>)}
                                </span>
                            </button>
                        </h3>
                        {/* <!-- Filter section, show/hide based on section state. --> */}
                        <div className="pt-6 hidden" id="filter-section-0" ref={colorBtn}>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input id="filter-color-0" disabled name="color[]" value="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">White</label>
                                </div>

                                <div className="flex items-center">
                                    <input id="filter-color-1" disabled name="color[]" value="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="filter-color-1" className="ml-3 text-sm text-gray-600">Beige</label>
                                </div>

                                <div className="flex items-center">
                                    <input id="filter-color-2" disabled name="color[]" value="blue" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="filter-color-2" className="ml-3 text-sm text-gray-600">Blue</label>
                                </div>

                                <div className="flex items-center">
                                    <input id="filter-color-3" disabled name="color[]" value="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="filter-color-3" className="ml-3 text-sm text-gray-600">Brown</label>
                                </div>

                                <div className="flex items-center">
                                    <input id="filter-color-4" disabled name="color[]" value="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="filter-color-4" className="ml-3 text-sm text-gray-600">Green</label>
                                </div>

                                <div className="flex items-center">
                                    <input id="filter-color-5" disabled name="color[]" value="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="filter-color-5" className="ml-3 text-sm text-gray-600">Purple</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col justify-around mt-4 space-y-4">
                        <label htmlFor="price" className="font-medium text-gray-900"> Price</label>
                        <span className="font-mono text-purple-500"><FormatPrice price={Number(price)} /></span>
                        <input className="w-4/5" name="price" value={price} onChange={filterTag} min={minPrice} max={maxPrice} type="range" />
                    </div>
                    <div className=" flex justify-around mt-4 w-4/5">
                        <div className="p-4 bg-purple-700 text-white rounded font-bold hover:bg-purple-950 cursor-pointer" onClick={clearFilterTag}>CLEAR FILTERS</div>
                    </div>
                </form >
            </div >
        </>
    )
}

export default Filter