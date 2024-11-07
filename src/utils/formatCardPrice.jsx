const formatCardPrice = (price) => {
    if (price >= 1000000000) return `${(price / 1000000000).toFixed(2)}B`;
    if (price >= 1000000) return `${(price / 1000000).toFixed(2)}M`;
    if (price >= 1000) return `${(price / 1000).toFixed(2)}K`;
    return `${price}`;
  };
  
  export default formatCardPrice;
  