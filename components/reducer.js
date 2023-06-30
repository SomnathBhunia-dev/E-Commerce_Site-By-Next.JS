export const Reducer = (state, action) => {
    switch (action.type) {
        case "FETCHING_ALL_PRODUCT":
            return {
                ...state,
                ProductList: action.payload,
            };
        case "SET_PAGE":
            return {
                ...state,
                page: action.payload + 1,
            };
        case "FETCHING_SINGLE_PRODUCT":
            return {
                ...state,
                singleProduct: action.payload,
            };
        case "SET_CART":
            return {
                ...state,
                Cart: action.payload,
            };
        case "ADD_TO_CART":
            const prevCart = state.Cart.find((i) => i.id === action.payload.id);
            if (prevCart) {
                const updateCart = state.Cart.map((i) => {
                    if (i.id === action.payload.id && i.size === action.payload.size) {
                        const newQty = i.Qty + action.payload.Qty;
                        return {
                            ...i,
                            Qty: newQty,
                        };
                    }
                    return i;
                });
                return {
                    ...state,
                    Cart: updateCart,
                };
            } else
                return {
                    ...state,
                    Cart: [...state.Cart, action.payload],
                };

        case "REMOVE_FROM_CART":
            let updatedCart = state.Cart.filter((i) => i.id !== action.payload);
            return {
                ...state,
                Cart: updatedCart,
            };

        case "CLEAR_CART":
            return {
                ...state,
                Cart: [],
            };
        case "ADD_TO_FAV":
            return {
                ...state,
                Favourite: [...state.Favourite, action.payload],
            };
        case "REMOVE_FROM_FAV":
            let updated = state.Favourite.filter((i) => i.id !== action.payload);
            return {
                ...state,
                Favourite: updated,
            };
        case "INC":
            let updateQty = state.Cart.map((i) => {
                if (i.id === action.payload) {
                    let newQty = i.Qty + 1;
                    return {
                        ...i,
                        Qty: newQty,
                    };
                } else return i;
            });
            return {
                ...state,
                Cart: updateQty,
            };
        case "DEC":
            let updatedQty = state.Cart.map((i) => {
                if (i.id === action.payload) {
                    let newQty = i.Qty - 1;
                    if (newQty < 1) {
                        newQty = 1;
                    }
                    return {
                        ...i,
                        Qty: newQty,
                    };
                } else return i;
            });
            return {
                ...state,
                Cart: updatedQty,
            };

        case "CART_TOTALS":
            let totalPrice = 0;
            let fee = state.shipFee;
            state.Cart.forEach((i) => {
                totalPrice += i.price * i.Qty;
            });
            return {
                ...state,
                total_Price: totalPrice,
                shipFee: fee,
                Sub_Total: totalPrice + fee,
            };

        case "LOAD_FILTER_PRODUCTS":
            let PriceArr = action.payload.map((i) => i.price);
            let maxPrice = Math.max(...PriceArr);
            return {
                ...state,
                filter_products: [...action.payload],
                FilterTag: { ...state.FilterTag, maxPrice, price: maxPrice },
            };

        case "CLEAR_FILTER_TAG":
            return {
                ...state,
                FilterTag: {
                    ...state.FilterTag,
                    text: "",
                    brand: "",
                    category: "",
                    price: state.FilterTag.maxPrice,
                },
            };

        case "UNCHECK_PRICE":
            return {
                ...state,
                FilterTag: {
                    ...state.FilterTag,
                    price: state.FilterTag.maxPrice,
                },
            };
        case "UPDATE_FILTER_VALUE":
            const { tag, value, isChecked } = action.payload;
            let newFilter = { ...state.FilterTag };
            if (tag === "category" || tag === "brand") {
                if (isChecked) {
                    if (!newFilter[tag]) {
                        newFilter[tag] = [value];
                    } else if (!newFilter[tag].includes(value)) {
                        newFilter[tag].push(value);
                    }
                } else {
                    newFilter[tag] = newFilter[tag].filter((val) => val !== value);
                }
            }
            if (tag === "text" || tag === "price") {
                newFilter[tag] = value;
            }
            return {
                ...state,
                FilterTag: newFilter,
            };

        case "UPDATE_FILTER_PRODUCTS":
            let tempFilterProduct = [...state.ProductList];

            const { text, category, brand, colors, price } = state.FilterTag;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((i) => {
                    return i.title.toLowerCase().includes(text.toLowerCase());
                });
            }

            if (category.length > 0) {
                tempFilterProduct = tempFilterProduct.filter((i) => {
                    return category.includes(i.category);
                });
            }

            if (brand.length > 0) {
                tempFilterProduct = tempFilterProduct.filter((i) => {
                    return brand.includes(i.brand);
                });
            }

            if (price) {
                tempFilterProduct = tempFilterProduct.filter((i) => i.price <= price);
            }
            return {
                ...state,
                filter_products: tempFilterProduct,
            };

        case "SORT_VALUE":
            return {
                ...state,
                Sorting_Value: action.payload,
            };

        case "SORTING_PRODUCTS":
            let newSortData;
            const { ProductList, filter_products, Sorting_Value } = state;

            let tempSortProduct = [...filter_products];

            const sortingProducts = (a, b) => {
                if (Sorting_Value === "low2high") {
                    return a.price - b.price;
                }

                if (Sorting_Value === "high2low") {
                    return b.price - a.price;
                }

                if (Sorting_Value === "a2z") {
                    return a.title.localeCompare(b.name);
                }

                if (Sorting_Value === "z2a") {
                    return b.title.localeCompare(a.name);
                }
            };

            newSortData = tempSortProduct.sort(sortingProducts);

            if (Sorting_Value === "popular") {
                newSortData = [...ProductList]; // show the original order
            }
            return {
                ...state,
                filter_products: newSortData,
            };

        case "ALERT":
            return {
                ...state,
                isAlert: true,
                alertMsg: action.payload.massage,
                alertType: action.payload.type,
            };
        case "ALERT_TIMEOUT":
            return {
                ...state,
                isAlert: false,
                alertMsg: "",
                alertType: "",
                //   maxLimitAlert: false
            };
        case "ADD_ADDRESS":
            if (action.payload.Default) {
                const updatedAddresses = state.address.map((a) => {
                    return { ...a, Default: false };
                });
                return {
                    ...state,
                    address: [...updatedAddresses, action.payload],
                };
            } else {
                if (state.address.length === 0) {
                    return {
                        ...state,
                        address: [{ ...action.payload, Default: true }],
                    };
                } else {
                    return {
                        ...state,
                        address: [...state.address, { ...action.payload, Default: false }],
                    };
                }
            }
        case "SET_ADS":
            return {
                ...state,
                address: action.payload,
            };
        case "DEL_ADS":
            const updateAddresses = state.address.filter(
                (i) => i.id !== action.payload
            );
            if (updateAddresses.length === 1) {
                updateAddresses[0].Default = true;
            }
            return {
                ...state,
                address: updateAddresses,
            };

        case "SET_DEFAULT":
            const updatedAddresses = state.address.map((a) => {
                if (a.id === action.payload) return { ...a, Default: true };
                else {
                    return { ...a, Default: false };
                }
            });
            return {
                ...state,
                address: updatedAddresses,
            };
        case "TXN_SUCCESS":
            return {
                ...state,
                Cart: [],
                RecentOrder: action.payload,
                MyOrders: [action.payload, ...state.MyOrders],
            };
        case "SET_ORDER":
            return {
                ...state,
                MyOrders: action.payload,
            };
        default:
            return state;
    }
};
