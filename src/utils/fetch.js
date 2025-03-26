import Cookies from 'js-cookie'
import updateOptions from './updateOptions'

export async function fetchAllPrices() {
  const prices = await fetch(`https://pt-be-airbnc.onrender.com/api/properties`, )
    .then(res => res.json())
    .then(data => {
      const properties_prices_per_nigth = []
      for (let property of data.properties) {
        if (!properties_prices_per_nigth.includes(Number(property.price_per_night))) {
          properties_prices_per_nigth.push(Number(property.price_per_night))
        }
      }
      return properties_prices_per_nigth
    })
  return prices
};

export async function fetchPropertyById(id) {
  // const token = localStorage.getItem("jsonwebtoken")
  const property = await fetch(`https://pt-be-airbnc.onrender.com/api/properties/${id}`)
  .then(res => res.json())
  .then(data => data.property);

  return property
};

export async function fetchFavourites() {
  const favourites = await fetch(`https://pt-be-airbnc.onrender.com/api/favourite`)
  .then(res => res.json())
  .then(data => data.favourites);

  return favourites
};

export async function fetchReviewsByPropertyId(id) {
  const reviews = await fetch(`https://pt-be-airbnc.onrender.com/api/properties/${id}/reviews`, )
  .then(res => res.json())
  .then(data => data.reviews);

  return reviews
};

export async function fetchUserById(id) {
  const user = await fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}`, updateOptions())
  .then(res => res.json())
  .then(data => data.user);

  return user;
};

export async function fetchProtectedRoute() {
  await fetch("https://pt-be-airbnc.onrender.com/api/protected", updateOptions())
  .then(res => res.json())

  // return data
}
// export async function fetchUniqueProperties(sortValue) {
//   const sortedProperties = await fetch(`https://pt-be-airbnc.onrender.com/api/properties?sort=${sortValue}`)
//   .then((res) => res.json())
//   .then((data) => {
//     const ids = []
//     const props = []
//     // removing the duplicate properties by property_id 
//     data.properties.map((property) => {
//       if(!ids.includes(property.property_id)) {
//         ids.push(property.property_id)
//         props.push(property)
//       }})
//       return props
// })
// .then(data => data.sort((a, b) => a[sortValue] > b[sortValue] ? 1 : -1))

// return sortedProperties
// }
