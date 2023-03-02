//Get the data from API
const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools.slice(0, 6)));
};
//Show the data to UI
const displayData = (data) => {
  const cardContainer = document.getElementById("cards-container");
  data.forEach((singleData) => {
    // console.log(singleData);
    cardContainer.innerHTML += `
    <div class="col">
    <div class="card">
      <img src="${singleData.image}" class="card-img-top p-3 rounded-3" alt="..." />
      <div class="card-body">
        <h5 class="card-title fw-bold">Features</h5>
        <p class="card-text">
        
        </p>
        <hr>
        <h5 class="card-title fw-bold">${singleData.name}</h5>
        <div class="text-end">
        <a href="#" class="btn btn-light rounded-circle text-danger"  data-bs-toggle="modal"
        data-bs-target="#cardDetailsModal"><i class="fa-solid fa-arrow-right" onclick="loadSingleData('${singleData.id}')"></i></a>
        </div>
        <p class="card-text"><i class="fa-regular fa-calendar-days"></i> ${singleData.published_in} </p>
      </div>
    </div>
  </div>
    `;
  });
};
// Load Single Data
const loadSingleData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => showDataModal(data.data));
};
// Show Single Data in A Modal
const showDataModal = (singledata) => {
  console.log(singledata.description);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  modalContainer.innerHTML += `
  <div class="card col-md-6" style="width: 20rem;">
  <div class="card-body">
    <h6 class="card-subtitle mb-2 text-muted">${singledata.description}</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
  <div class="card col-md-6" style="width: 20rem">
    <img src="..." class="card-img-top" alt="..." />
    <div class="card-body">
      <p class="card-text">
        Some quick example text to build on the card title and
        make up the bulk of the card's content.
      </p>
    </div>
  </div>

  `;
};
// Show All Data to UI
const showAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};
