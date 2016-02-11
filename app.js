const express = require( 'express' );
const app = express();
const publicPath = require('path').join( __dirname, 'public' );
const bodyParser = require('body-parser');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var restaurants = [
  {id: 1, city: "Portland", name: "City Grill", address: "111 SW 5th Ave"},
  {id: 2, city: "Portland", name: "Departure", address: "525 SW Morrison"},
  {id: 3, city: "Seattle", name: "Metropolitan Grill", address: "820 2nd Ave"}
]

app.get( '/api/restaurants', ( req, res ) => {
	res.json( restaurants.map( restaurant => {
		return { id: restaurant.id, name: restaurant.name };
	}));
});

app.get( '/api/restaurants/:id', ( req, res ) => {
	var restaurant = restaurants.find( restaurant => restaurant.id == req.params.id );
	res.json(restaurant);
});

app.post( '/api/restaurants', ( req, res ) => {
  req.body.id = restaurants[restaurants.length - 1].id + 1;
  restaurants.push(req.body);
  res.json(restaurants[restaurants.length - 1]);
});

app.delete('/api/restaurants/:id', (req, res) => {
  var index = restaurants.findIndex( restaurant => {
    if (restaurant.id == req.params.id) return true;
    return false;
  });
  if (index !== -1) {
    restaurants.splice(index, 1);
    res.send('Deleted');
  } else {
    res.status(400).send('No restaurant ID found');
  }
})

app.patch( '/api/restaurants/:id', ( req, res ) => {
  var index = restaurants.findIndex( restaurant => {
    if (restaurant.id == req.params.id) return true;
    return false;
  });
  if (index !== -1) {
    req.body.id = req.params.id;
    restaurants[index] = req.body;
    res.json(restaurants[index]);
  } else {
    res.status(400).send('No restaurant ID found');
  }
});

const port = process.env.PORT || 8000;
app.listen( port, () => console.log( `app running on ${port}...` ) );
