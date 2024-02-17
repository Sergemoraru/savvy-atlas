import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

  const ResultsPage = () => {
  const { query } = useRouter();
  const [results, setResults] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    // Example endpoint and API key
    const endpoint = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${query.from}&destinationLocationCode=${query.to}&departureDate=${query.departureDate}`;
    const apiKey = process.env.AMADEUS_API_KEY; // Replace with your actual method to securely use the API key

    try {
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data.data); // Assuming the data is in the response's data field
    } catch (error) {
      console.error('Fetching error:', error);
      setResults([]);
    }
  };

  if (query.from && query.to && query.departureDate) {
    fetchData();
  }
}, [query]);


return (
  <div className="p-4">
    {results.length > 0 ? (
      results.map((flight, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="font-bold text-lg">Flight from {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</h3>
          <p>Departure: {flight.itineraries[0].segments[0].departure.at}</p>
          <p>Arrival: {flight.itineraries[0].segments[0].arrival.at}</p>
          <p>Price: {flight.price.total} {flight.price.currency}</p>
        </div>
      ))
    ) : (
      <p>No flights found</p>
    )}
  </div>
);
}

export default ResultsPage;
