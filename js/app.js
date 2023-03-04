//Get the data from API
const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data.tools.slice(0, 6));
    })
    .catch((data) => {
      console.error(data);
    });
  // Spinner On
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
};

//Show cards to UI
const displayData = (data) => {
  // Spinner Off
  const spinner = document.getElementById("spinner");
  spinner.classList.add("d-none");
  // Formate Date
  const formatDate = (dateString) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  const cardContainer = document.getElementById("cards-container");
  cardContainer.innerHTML = "";
  data.forEach((singleData) => {
    cardContainer.innerHTML += `
    <div class="col">
    <div class="card" style="width:300px; height: 500px;">
      <img src="${
        singleData.image
      }" style=" max-height: 200px;" class="card-img-top p-3" alt="..." />
      <div class="card-body">
        <h5 class="card-title fw-bold">Features</h5>
        <ol type="1">
        ${singleData.features.map((item) => `<li>${item}</li>`).join("")}
      </ol>
        <hr>
        <h5 class="card-title fw-bold">${singleData.name}</h5>
        <div class="text-end">
        <a href="#" data-bs-toggle="modal"
        data-bs-target="#singleDataModal" onclick="loadSingleData('${
          singleData.id
        }')" class="btn btn-light rounded-circle text-danger" ><i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <p class="card-text"><i class="fa-regular fa-calendar-days"></i> ${formatDate(
          singleData.published_in
        )} </p>
      </div>
    </div>
  </div>
    `;
  });
};
// Filter Cards By Date
const sortFeaturesByDate = () => {
  const featuresContainer = document.getElementById("cards-container");
  const features = Array.from(featuresContainer.children);
  // Spinner On
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  features.sort((a, b) => {
    const aDate = new Date(
      a.querySelector(".fa-calendar-days").parentNode.textContent.trim()
    );
    const bDate = new Date(
      b.querySelector(".fa-calendar-days").parentNode.textContent.trim()
    );
    return bDate - aDate;
  });
  // Spinner Off
  spinner.classList.add("d-none");
  features.forEach((feature) => {
    featuresContainer.appendChild(feature);
  });
};
// Show all data to UI
const showAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
  const btnSeeMore = document.getElementById("btn-see-more");
  btnSeeMore.classList.add("d-none");
  // Spinner Start
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
};
// Load Single Data
const loadSingleData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showDataModal(data.data);
    })
    .catch((data) => {
      console.error(data);
    });
};
// Show Single Data in A Modal
const showDataModal = (singleDataDetails) => {
  console.log(singleDataDetails);
  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = "";
  modalContainer.innerHTML += `
  <div class="d-md-flex px-3 pb-3 gap-1 align-items-center justify-content-between">
                <div class="card w-md-50 mb-5 border border-danger modal-right-card">
                  <div class="card-body">
                    <h5 class="card-title">${singleDataDetails.description}</h5>
                    <div class="row my-3">
                      <div class="pricing col-4">
                        <p class="text-success fw-bold">
                          <span>${
                            singleDataDetails.pricing
                              ? singleDataDetails.pricing[0].price
                              : "Free"
                          }
                            <br />
                          </span>
                          <span> Month <br /> </span>
                          <span>${
                            singleDataDetails.pricing
                              ? singleDataDetails.pricing[0].plan
                              : "Basic"
                          }</span>
                        </p>
                      </div>
                      <div class="pricing col-4">
                        <p class="fw-bold text-warning-emphasis">
                          <span>${
                            singleDataDetails.pricing
                              ? singleDataDetails.pricing[1].price
                              : "No Cost"
                          }</span> <br />
                          Month <br />
                          <span>${
                            singleDataDetails.pricing
                              ? singleDataDetails.pricing[1].plan
                              : "Professional"
                          }</span>
                        </p>
                      </div>
                      <div class="pricing col-4">
                        <p class="fw-bold text-danger">
                          Contact <br />
                          Us for <br />
                          <span>${
                            singleDataDetails.pricing
                              ? singleDataDetails.pricing[2].plan
                              : "For Pro"
                          }</span>
                        </p>
                      </div>
                    </div>
                    <div class="d-md-flex px-2 gap-1 justify-content-between">
                      <div>
                        <h5>Features</h5>
                        <ul>
                          <li>${singleDataDetails.features[1].feature_name}</li>
                          <li>${singleDataDetails.features[2].feature_name}</li>
                          <li>${singleDataDetails.features[3].feature_name}</li>
                        </ul>
                      </div>
                      <div>
                        <h5>Integrations</h5>
                        <p">
                        <ul type="1">
                        ${
                          singleDataDetails.integrations
                            ? singleDataDetails.integrations
                                .map((item) => `<li>${item}</li>`)
                                .join("")
                            : "No data found"
                        }
                      </ul>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div">
                <div class="card" style="width: 340px;">
        <img src="${
          singleDataDetails.image_link[0]
        }" class="card-img-top p-3 " alt="..." />
        <a href="#" style="margin-left:210px;" id="accuracy-btn" class="btn btn-danger position-absolute mt-1 me-n5" >${
          singleDataDetails.accuracy.score
            ? singleDataDetails.accuracy.score * 100
            : "0"
        }% accuracy</a>
        <div class="card-body text-center">
          <h5 class="card-title">${
            singleDataDetails.input_output_examples
              ? singleDataDetails.input_output_examples[0].input
              : ""
          }</h5>
          <p class="card-text">${
            singleDataDetails.input_output_examples
              ? singleDataDetails.input_output_examples[0].output
              : "No Example Yet<br> Take a break "
          } </p>
        </div>
       </div>
                </div>
              </div>
  `;
};
