
const FornatPrice = ({ price='' }) => {
    const Price = price;
    const formattedPrice = Price.toLocaleString("en-US", { style: "currency", currency: "USD" });
    // console.log(formattedPrice);
    
    return (
        <>
            <span className="font-bold">{formattedPrice}</span>
        </>
    )
}

export default FornatPrice