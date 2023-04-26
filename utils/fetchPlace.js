

const test = 'k.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdkeHV5OXIwOWgxM3JwN2V6cDh2eWVzIn0.1o8ix2i0YO2BXk3ErHn9Gg'
const mapboxglAccessToken = "pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdkeHV5OXIwOWgxM3JwN2V6cDh2eWVzIn0.1o8ix2i0YO2BXk3ErHn9Gg"

export const fetchPlace = async (text) => {
    try {
      
      
        const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?country=GR&access_token=${mapboxglAccessToken}&cachebuster=1625641871908&autocomplete=true&types=place`
        );
       
       
      /**
       *  const res = await fetch(
        `https://api.mapbox.com/autofill/v1/suggest/${text}?types=address&streets=true&access_token=${mapboxglAccessToken}&language=en&country=gr`
      )
       */
       
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
};