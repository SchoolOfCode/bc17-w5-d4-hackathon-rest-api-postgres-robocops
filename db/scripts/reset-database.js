import { pool } from "../index.js";

// >>> MAKE SURE YOU UNDERSTAND THIS FILE AND WHAT IT'S DOING <<<
// >>> FEEL FREE TO CHANGE IT TO MAKE YOUR OWN RESOURCES (TABLES AND PROPERTIES) - YOU DON'T HAVE TO USE ALBUMS AND ARTISTS <<<

async function resetDatabase() {
    try {
        // Drop existing tables if they exist
        await pool.query(`
        DROP TABLE IF EXISTS trainers CASCADE;
        DROP TABLE IF EXISTS pokemon CASCADE;
    `);

        // Create the pokemon table
        await pool.query(`
        CREATE TABLE pokemon (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL
        );
    `);

        // Create the trainers table with foreign keys to the pokemon table
        await pool.query(`
        CREATE TABLE trainers (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            hometown VARCHAR(255) NOT NULL,
            slot_1 INT REFERENCES pokemon(id),
            slot_2 INT REFERENCES pokemon(id),
            slot_3 INT REFERENCES pokemon(id),
            slot_4 INT REFERENCES pokemon(id),
            slot_5 INT REFERENCES pokemon(id),
            slot_6 INT REFERENCES pokemon(id)
        );
    `);

        // Seed the pokemon table
        await pool.query(`
    	INSERT INTO pokemon (name, type)
    	VALUES 
        ('Bulbasaur', 'Grass/Poison'),
        ('Ivysaur', 'Grass/Poison'),
        ('Venusaur', 'Grass/Poison'),
        ('Charmander', 'Fire'),
        ('Charmeleon', 'Fire'),
        ('Charizard', 'Fire/Flying'),
        ('Squirtle', 'Water'),
        ('Wartortle', 'Water'),
        ('Blastoise', 'Water'),
        ('Caterpie', 'Bug'),
        ('Metapod', 'Bug'),
        ('Butterfree', 'Bug/Flying'),
        ('Weedle', 'Bug/Poison'),
        ('Kakuna', 'Bug/Poison'),
        ('Beedrill', 'Bug/Poison'),
        ('Pidgey', 'Normal/Flying'),
        ('Pidgeotto', 'Normal/Flying'),
        ('Pidgeot', 'Normal/Flying'),
        ('Rattata', 'Normal'),
        ('Raticate', 'Normal'),
        ('Spearow', 'Normal/Flying'),
        ('Fearow', 'Normal/Flying'),
        ('Ekans', 'Poison'),
        ('Arbok', 'Poison'),
        ('Pikachu', 'Electric'),
        ('Raichu', 'Electric'),
        ('Sandshrew', 'Ground'),
        ('Sandslash', 'Ground'),
        ('Nidoran♀', 'Poison'),
        ('Nidorina', 'Poison'),
        ('Nidoqueen', 'Poison/Ground'),
        ('Nidoran♂', 'Poison'),
        ('Nidorino', 'Poison'),
        ('Nidoking', 'Poison/Ground'),
        ('Clefairy', 'Fairy'),
        ('Clefable', 'Fairy'),
        ('Vulpix', 'Fire'),
        ('Ninetales', 'Fire'),
        ('Jigglypuff', 'Normal/Fairy'),
        ('Wigglytuff', 'Normal/Fairy'),
        ('Zubat', 'Poison/Flying'),
        ('Golbat', 'Poison/Flying'),
        ('Oddish', 'Grass/Poison'),
        ('Gloom', 'Grass/Poison'),
        ('Vileplume', 'Grass/Poison'),
        ('Paras', 'Bug/Grass'),
        ('Parasect', 'Bug/Grass'),
        ('Venonat', 'Bug/Poison'),
        ('Venomoth', 'Bug/Poison'),
        ('Diglett', 'Ground'),
        ('Dugtrio', 'Ground'),
        ('Meowth', 'Normal'),
        ('Persian', 'Normal'),
        ('Psyduck', 'Water'),
        ('Golduck', 'Water'),
        ('Mankey', 'Fighting'),
        ('Primeape', 'Fighting'),
        ('Growlithe', 'Fire'),
        ('Arcanine', 'Fire'),
        ('Poliwag', 'Water'),
        ('Poliwhirl', 'Water'),
        ('Poliwrath', 'Water/Fighting'),
        ('Abra', 'Psychic'),
        ('Kadabra', 'Psychic'),
        ('Alakazam', 'Psychic'),
        ('Machop', 'Fighting'),
        ('Machoke', 'Fighting'),
        ('Machamp', 'Fighting'),
        ('Bellsprout', 'Grass/Poison'),
        ('Weepinbell', 'Grass/Poison'),
        ('Victreebel', 'Grass/Poison'),
        ('Tentacool', 'Water/Poison'),
        ('Tentacruel', 'Water/Poison'),
        ('Geodude', 'Rock/Ground'),
        ('Graveler', 'Rock/Ground'),
        ('Golem', 'Rock/Ground'),
        ('Ponyta', 'Fire'),
        ('Rapidash', 'Fire'),
        ('Slowpoke', 'Water/Psychic'),
        ('Slowbro', 'Water/Psychic'),
        ('Magnemite', 'Electric/Steel'),
        ('Magneton', 'Electric/Steel'),
        ('Farfetchd', 'Normal/Flying'),
        ('Doduo', 'Normal/Flying'),
        ('Dodrio', 'Normal/Flying'),
        ('Seel', 'Water'),
        ('Dewgong', 'Water/Ice'),
        ('Grimer', 'Poison'),
        ('Muk', 'Poison'),
        ('Shellder', 'Water'),
        ('Cloyster', 'Water/Ice'),
        ('Gastly', 'Ghost/Poison'),
        ('Haunter', 'Ghost/Poison'),
        ('Gengar', 'Ghost/Poison'),
        ('Onix', 'Rock/Ground'),
        ('Drowzee', 'Psychic'),
        ('Hypno', 'Psychic'),
        ('Krabby', 'Water'),
        ('Kingler', 'Water'),
        ('Voltorb', 'Electric'),
        ('Electrode', 'Electric'),
        ('Exeggcute', 'Grass/Psychic'),
        ('Exeggutor', 'Grass/Psychic'),
        ('Cubone', 'Ground'),
        ('Marowak', 'Ground'),
        ('Hitmonlee', 'Fighting'),
        ('Hitmonchan', 'Fighting'),
        ('Lickitung', 'Normal'),
        ('Koffing', 'Poison'),
        ('Weezing', 'Poison'),
        ('Rhyhorn', 'Ground/Rock'),
        ('Rhydon', 'Ground/Rock'),
        ('Chansey', 'Normal'),
        ('Tangela', 'Grass'),
        ('Kangaskhan', 'Normal'),
        ('Horsea', 'Water'),
        ('Seadra', 'Water'),
        ('Goldeen', 'Water'),
        ('Seaking', 'Water'),
        ('Staryu', 'Water'),
        ('Starmie', 'Water/Psychic'),
        ('Mr. Mime', 'Psychic/Fairy'),
        ('Scyther', 'Bug/Flying'),
        ('Jynx', 'Ice/Psychic'),
        ('Electabuzz', 'Electric'),
        ('Magmar', 'Fire'),
        ('Pinsir', 'Bug'),
        ('Tauros', 'Normal'),
        ('Magikarp', 'Water'),
        ('Gyarados', 'Water/Flying'),
        ('Lapras', 'Water/Ice'),
        ('Ditto', 'Normal'),
        ('Eevee', 'Normal'),
        ('Vaporeon', 'Water'),
        ('Jolteon', 'Electric'),
        ('Flareon', 'Fire'),
        ('Porygon', 'Normal'),
        ('Omanyte', 'Rock/Water'),
        ('Omastar', 'Rock/Water'),
        ('Kabuto', 'Rock/Water'),
        ('Kabutops', 'Rock/Water'),
        ('Aerodactyl', 'Rock/Flying'),
        ('Snorlax', 'Normal'),
        ('Articuno', 'Ice/Flying'),
        ('Zapdos', 'Electric/Flying'),
        ('Moltres', 'Fire/Flying'),
        ('Dratini', 'Dragon'),
        ('Dragonair', 'Dragon'),
        ('Dragonite', 'Dragon/Flying'),
        ('Mewtwo', 'Psychic'),
        ('Mew', 'Psychic');
		`);

        // Seed the trainers table
        await pool.query(`
        INSERT INTO trainers (name, hometown, slot_1, slot_2, slot_3, slot_4, slot_5, slot_6)
        VALUES 
            ('Ash', 'Pallet Town', 1, 2, NULL, NULL, NULL, NULL),
            ('Misty', 'Cerulean City', 4, NULL, NULL, NULL, NULL, NULL),
            ('Brock', 'Pewter City', 3, 5, NULL, NULL, NULL, NULL);
    `);

        console.log("Database reset successful");
    } catch (error) {
        console.error("Database reset failed: ", error);
    } finally {
        // End the pool
        await pool.end();
    }
}

await resetDatabase();
