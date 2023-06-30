import { useGlobalState } from '@/components/context'
import { useState, useRef } from 'react'
import Filter from './filter'

const Sort = () => {
    const { toggleCart, sorting_Value, Sorting_Value } = useGlobalState()
    const [close, setclose] = useState(true)
    const [open, setopen] = useState(true)

    const toggleSortBtn = () => {
        setopen((prevState) => !prevState);
    };

    const sortBtn = useRef()
    const sideBtn = useRef()
    const sortingValue = [
        { Tag: 'Most Popular', value: 'popular' },
        { Tag: 'Price: Low to High', value: 'low2high' },
        { Tag: 'Price: High to Low', value: 'high2low' },
        { Tag: 'A - Z', value: 'a2z' },
        { Tag: 'Z - A', value: 'z2a' }
    ]

    return (
        <>
            <div className="flex items-baseline justify-between border-b border-gray-200 py-4 sticky top-20 bg-white z-[5]">
                <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
                    <div className={`fixed inset-0 bg-black ${close ? 'bg-opacity-[-1] hidden' : 'bg-opacity-25'}`}></div>
                    <div className={`fixed inset-0 ${close ? 'z-[-1] hidden' : 'z-40 flex'}`} >
                        <div className="relative ml-auto h-full w-3/4 max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl hidden" ref={sideBtn}>
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button onClick={() => { toggleCart(sideBtn); setclose(true) }} type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* <!-- Filters --> */}
                            <Filter />
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                <div className="flex items-center">
                    <div className="relative inline-block text-left">
                        <div>
                            <button type="button" className="border-none group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="false" onClick={() => { toggleCart(sortBtn); toggleSortBtn() }}>
                                Sort
                                <svg className={`${!open ? "transform rotate-180" : ""} -mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute hidden right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" ref={sortBtn}>
                            <div className="py-1" role="none">
                                {sortingValue.map((i) => {
                                    return <div data-value={i.value} key={i.Tag} className={`${Sorting_Value === i.value ? 'bg-gray-100 font-medium text-gray-900 block px-4 py-2 text-sm cursor-pointer hover:bg-purple-400 hover:text-white outline-none' : 'text-gray-500 block px-4 py-2 text-sm cursor-pointer hover:bg-purple-400 hover:text-white'}`} role="menuitem" tabIndex="-1" id="menu-item-0" onClick={(e) => sorting_Value(e)}>{i.Tag}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                        <span className="sr-only">Filters</span>
                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" onClick={() => { toggleCart(sideBtn); setclose(false) }}>
                            <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sort