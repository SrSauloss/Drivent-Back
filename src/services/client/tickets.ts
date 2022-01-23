import TicketPrice from "@/entities/TicketPrice";

export async function getPrices() {
  const prices = await TicketPrice.getPrices();
  let priceObj = {};
  prices.forEach((item) => {
    priceObj = { ...priceObj, [item.name]: item.price };
  });
  return priceObj;
}
