// Import the required modules
import express from "express";



// Import your helper functions for your first resource here
import {
  getAllPokemon,
  getAllPokemonById,
  // createPokemon,
  //   updateResourceOneById,
  //   deleteResourceOneById,
} from "./pokemon.js";


// Import your helper functions for your second resource here
// import {
//   getResourceTwo,
//   getResourceTwoById,
//   createResourceTwo,
//   updateResourceTwoById,
//   deleteResourceTwoById,
// } from "./resource_two.js";



// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests




// Resource One Route Handlers

// Endpoint to retrieve all <resource_one>
app.get("/pokemon", async function (req, res) {
  try {
    const pokemon = await getAllPokemon();
    //console.log(pokemon)
    res.status(200).json({
      success: true,
      data: pokemon
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: []
    })
  }
});

// Endpoint to retrieve a <resource_one> by id
app.get("/pokemon/:id", async function (req, res) {
  try {
    const pokemonById = await getAllPokemonById(req.params.id);
    //console.log(pokemonById)
    if (!pokemonById) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "Pokemon not found" } });
    }

    res.status(200).json({
      status: "success",
      data: pokemonById
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: []
    })
  }
})

// Endpoint to create a new <resource_one>
app.post("/resourceone/", async function (req, res) {
});

// Endpoint to update a specific <resource_one> by id
app.patch("/resourceone/:id", async function (req, res) {
});

// Endpoint to delete a specific <resource_one> by id
app.delete("/resourceone/:id", async function (req, res) {
});




// Resource Two Route Handlers

// Endpoint to retrieve all <resource_twos>
app.get("/resourcetwo/", async function (req, res) {
  const authors = await getAuthors();
  res.status(200).json({ status: "success", data: authors });
});

// Endpoint to retrieve a <resource_twos> by id
app.get("/resourcetwo/:id", async function (req, res) {
});

// Endpoint to create a new <resource_twos>
app.post("/resourcetwo/", async function (req, res) {
});

// Endpoint to update a specific <resource_twos> by id
app.patch("/resourcetwo/:id", async function (req, res) {
});

// Endpoint to delete a specific <resource_twos> by id
app.delete("/resourcetwo/:id", async function (req, res) {
});





// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});