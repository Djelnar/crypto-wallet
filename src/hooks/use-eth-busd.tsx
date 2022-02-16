import { useEffect, useState } from 'react'

const currencyURL = 'https://api.binance.com/api/v3/avgPrice?symbol=ETHBUSD'

export const useEthBusd = (ethValue: number) => {
  const [rate, setRate] = useState(0)

  const getData = () =>
    fetch(currencyURL)
      .then((res) => res.json())
      .then((data) => +data.price)
      .then((price) => setRate(price))

  useEffect(() => {
    getData()
    let intervalID = setInterval(() => {
      getData()
    }, 5 * 1000 * 60)

    return () => clearInterval(intervalID)
  }, [])

  return ethValue * rate
}
