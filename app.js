// Import the required modules
import express from "express";



// Import your helper functions for your first resource here
import {
  getAllPokemon,
  getAllPokemonById,
  createPokemon,
  updatePokemonById,
  deletePokemonById,
} from "./pokemon.js";


// Import your helper functions for your second resource here
import {
  getTrainers,
  getTrainerById,
  createTrainerById,
  updateTrainerById,
  deleteTrainerById,
} from "./trainers.js";



// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

app.use(express.static('public'))


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
app.post("/pokemon/", async function (req, res) {
  try {
    const newPokemon = await createPokemon(req.body);
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to update a specific <resource_one> by id
app.patch("/pokemon/:id", async function (req, res) {
  try {
    const result = await updatePokemonById(req.params.id, req.body);
    if (!result) {
      res.status(404).json({ error: "Trainer not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a specific <resource_one> by id

app.delete("/pokemon/:id", async function (req, res) {
  try {
    const pokemonById = await deletePokemonById(req.params.id);
    if (!success) {
      res.status(404).json({ error: "Pokemon not found" });
    }
    res.status(200).json({
      message: "successfully deleted pokemon",
      data: pokemonById
    });
  } catch (error) {
    res.status(500).json('Server error has occured');
  }
});




// Resource Two Route Handlers

// Endpoint to retrieve all <resource_twos>
app.get("/trainers/", async function (req, res) {
  try {
    const trainers = await getTrainers();
    //console.log(trainers)
    res.status(200).json({
      success: true,
      data: trainers
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: []
    })
  }
});

// Endpoint to retrieve a <resource_twos> by id
app.get("/trainer/:id", async function (req, res) {
  try {
    const trainerById = await getTrainerById(req.params.id);
    console.log(trainerById)
    if (!trainerById) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "Trainer not found" } });
    }

    res.status(200).json({
      status: "success",
      data: trainerById
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error.message
    })
  }

});

// Endpoint to create a new <resource_twos>
app.post("/trainer/", async function (req, res) {
  try {
    const newTrainer = await createTrainerById(req.body);
    res.status(201).json(newTrainer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to update a specific <resource_twos> by id
app.patch("/trainer/:id", async function (req, res) {
  try {
    const result = await updateTrainerById(req.params.id, req.body);
    if (!result) {
      res.status(404).json({ error: "Trainer not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/trainer/:id", async function (req, res) {
  try {
    const trainerById = await deleteTrainerById(req.params.id);
    if (!success) {
      res.status(404).json({ error: "Trainer not found" });
    }
    res.status(200).json({
      message: "successfully deleted Trainer",
      data: trainerById
    });
  } catch (error) {
    res.status(500).json('Server error has occured');
  }
});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});


