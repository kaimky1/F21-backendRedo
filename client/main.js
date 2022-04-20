const carsContainer = document.querySelector(`#cars-container`)
const form = document.querySelector('form')


const carsCallBack = ({data:cars}) => displayCars(cars)
const baseURL = "http://localhost:4000/api/cars"

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };


  const getAllCars = () => 
  axios.get(baseURL)
  .then(carsCallBack)

  const createCar = body => 
  axios.post(baseURL, body)
  .then(carsCallBack)

  const deleteCar = id => 
  axios.delete(`${baseURL}/${id}`)
  .then(carsCallBack)

  const editZone = document.getElementById("edit-zone");

  

  const editCar = (car) => {
    console.log("hit")
    // console.log(car.Model)
    console.log(car)
    const editForm = document.createElement("form")
    editForm.className = 'edit-form'
    editForm.innerHTML = `
    <input id = 'make-input' placeholder = "Make" class="form-input" value = "${car.Make}""/>
    <input id = 'model-input' placeholder = "Model" class="form-input" value = "${car.Model}""/>
    <input id = 'year-input' placeholder = "Year" class="form-input" value = "${car.Year}""/>
    <button>save changes</button>
    `
    editZone.appendChild(editForm)

    editForm.addEventListener("submit", e => {
    let updates = {
      Make: document.getElementById("make-input").value,
      Model: document.getElementById("model-input").value,
      Year: document.getElementById("year-input").value
    }
    axios
    .put(`${baseURL}/${car.id}`, updates)
    .then(res => {
      handleDisplay(res.data)
      editForm.remove()
    })
  })
}

  function submitHandler(e) {
      e.preventDefault()

      let make = document.querySelector('#Make')
      let model = document.querySelector('#Model')
      let year = document.querySelector('#Year')

      let bodyObj = {
          Make: make.value,
          Model: model.value,
          Year: year.value
      }
      createCar(bodyObj)

      make.value = '';
      model.value = '';
      year.value = '';
  }

  
  
  
  
  function createCarCard(car) {
      const carCard = document.createElement('div')
      carCard.classList.add('car-card')

      carCard.innerHTML = 
      `
      <p class="car-make">${car.Make}</p>
      <p class="car-model">${car.Model}</p>
      <p class="car-year">${car.Year}</p>
      <div class="btns-container">
        <button id="edit-id-${car.id})">Edit Car</button>
        <button id=${car.id})"> Delete Car</button>
      </div>
      `
    carsContainer.appendChild(carCard)
    editCar(car);
  }; //I think I can't create an event listener for the submit button because the createCarCard only gets called everytime we getCars.


  
  function displayCars(arr){
      carsContainer.innerHTML = ``
      for(let i = 0; i < arr.length; i++){
          createCarCard(arr[i])
      }
  }

  const handleDisplay = arr => {
    while (carsContainer.childNodes.length > 0) {
      carsContainer.removeChild(carsContainer.lastChild)
    }
  
    for (let i = 0; i < arr.length; i++) {
      displayCars(arr[i])
    }
  }

  form.addEventListener('submit', submitHandler)
  getAllCars();