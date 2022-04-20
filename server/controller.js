let cars = require('./db.json')
let globalID = 3;

module.exports = {
    getCompliment:(req, res) => {
    const compliments = ["Gee, you're a smart cookie!",
                       "Cool shirt!",
                       "Your Javascript skills are stellar.",
                    ];
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];
    res.status(200).send(randomCompliment);
    },

    getCars:(req, res) => {
        res.status(200).send(cars)
    },

    createCar: (req, res) => {
        const{Make, Model, Year} = req.body;

        let newCar = {
            id:globalID,
            Make,
            Model,
            Year
        }
        cars.push(newCar);
        globalID++;
        res.status(200).send(cars); 
    },

    deleteCar: (req, res) => {
        console.log(req.params)
        let index = cars.findIndex(elem => elem.id === +req.params.id)
        cars.splice(index, 1);
        res.status(200).send(cars)
    },

    editCar: (req, res) => {
        console.log(req.id)
        console.log(req.params)
        const {id} = req.params;
        const{Make, Model, Year} = req.body;
        let updatedCar = {
            id,
            Make,
            Model,
            Year,
        }
        let index = cars.findIndex(car => car.id === +id)
        cars.splice(index, 1, updatedCar)

        res.status(200).send(cars)
    }
}