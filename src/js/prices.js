const id = s => document.getElementById(s);

if (id("switch")) {
  const checkbox = id("switch");

  const priceSingle = id("plan__sum--single");
  const lowerPriceSingle = priceSingle.innerText;

  const priceMonthly = id("plan__sum--monthly");
  const lowerPriceMonthly = priceMonthly.innerText;

  const priceUnlimited = id("plan__sum--unlimited");
  const lowerPriceUnlimited = priceUnlimited.innerText;

  const fullPrice = Array.from(document.querySelectorAll(".plan__price--full"));
  const lowPrice = Array.from(document.querySelectorAll(".plan__price--low"));

  function changePrices(ch) {
    if (ch.checked) {
      console.log("checked");

      // show lower price
      lowPrice.forEach(el => {
        el.classList.remove("is-hidden");
      });

      // add proper style class to fullprice
      fullPrice.forEach(el => {
        el.classList.add("plan__full-price");
      });
      fullPrice.forEach(el => {
        el.classList.remove("plan__lower-price");
      });

      priceSingle.innerText = lowerPriceSingle;
      priceMonthly.innerText = lowerPriceMonthly;
      priceUnlimited.innerText = lowerPriceUnlimited;
    } else {
      console.log("not checked");

      // hide lower price
      lowPrice.forEach(el => {
        el.classList.add("is-hidden");
      });

      // add proper style class to fullprice
      fullPrice.forEach(el => {
        el.classList.remove("plan__full-price");
        el.classList.add("plan__lower-price");
      });

      priceSingle.innerText = id("plan__full-price--single").innerText;
      priceMonthly.innerText = id("plan__full-price--monthly").innerText;
      priceUnlimited.innerText = id("plan__full-price--unlimited").innerText;
    }
  }
  changePrices(checkbox);
  checkbox.addEventListener("change", function() {
    changePrices(checkbox);
  });
}
