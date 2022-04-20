const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const{getCompliment, getCars, createCar, deleteCar, editCar} = require('./controller')

app.get("/api/compliment", getCompliment)

app.get("/api/cars", getCars)

app.post("/api/cars", createCar)

app.delete("/api/cars/:id", deleteCar)

app.put("/api/cars/:id", editCar)


app.listen(4000, () => console.log("Server running on 4000"));
