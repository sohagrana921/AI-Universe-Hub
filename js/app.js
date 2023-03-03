//Get the data from API
const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools.slice(0, 6)));
};
//Show the data to UI
const displayData = (data) => {
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
        data-bs-target="#singleDataModal" class="btn btn-light rounded-circle text-danger" ><i class="fa-solid fa-arrow-right" onclick="loadSingleData('${
          singleData.id
        }')"></i></a>
        </div>
        <p class="card-text"><i class="fa-regular fa-calendar-days"></i> ${
          singleData.published_in
        } </p>
      </div>
    </div>
  </div>
    `;
  });
};
// Show All Data to UI
const showAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
  const btnSeeMore = document.getElementById("btn-see-more");
  btnSeeMore.classList.add("d-none");
};
// Load Single Data
const loadSingleData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => showDataModal(data.data));
};
// Set InnerText
function setInnerText(id, innerText) {
  const div = document.getElementById(id);
  div.innerText = innerText;
}
// Show Single Data in A Modal
const showDataModal = (singleDataDetails) => {
  console.log(singleDataDetails);
  // Set Modal Card Title
  setInnerText("modal-data-title", `${singleDataDetails.description}`);
  // Price 1
  setInnerText(
    "basic-price",
    `${
      singleDataDetails.pricing[0] ? singleDataDetails.pricing[0].price : "Free"
    }`
  );
  setInnerText("plan1", `${singleDataDetails.pricing[0].plan}`);
  // Price-2
  setInnerText("pro-price", `${singleDataDetails.pricing[1].price}`);
  setInnerText("plan2", `${singleDataDetails.pricing[1].plan}`);
  // Price-3
  setInnerText("enterPrice", `${singleDataDetails.pricing[2].plan}`);
  // Features
  setInnerText("features-1", `${singleDataDetails.features[1].feature_name}`);
  setInnerText("features-2", `${singleDataDetails.features[2].feature_name}`);
  setInnerText("features-3", `${singleDataDetails.features[3].feature_name}`);

  // Integrations
  const integration = document.getElementById("integrations");
  integration.innerHTML = "";
  integration.innerHTML += `
<ul type="1">
        ${singleDataDetails.integrations
          .map((item) => `<li>${item}</li>`)
          .join("")}
      </ul>
`;
  // Modal Card BG Image Side
  const imageContainer = document.getElementById("modal-card-image");
  imageContainer.innerHTML = "";
  imageContainer.innerHTML += `
  <div class="card" style="width: 340px; height:100%">
  <img src="${
    singleDataDetails.image_link[0]
  }" class="card-img-top p-3 " alt="..." />
  <a href="#" style="margin-left:200px;" id="accuracy-btn" class="btn btn-danger position-absolute mt-2 me-n5" ><span id="accuracy-persent">${
    singleDataDetails.accuracy.score * 100
  }</span> % accuracy</a>
  <div class="card-body text-center">
    <h5 class="card-title">${
      singleDataDetails.input_output_examples[0].input
    }</h5>
    <p class="card-text">${
      singleDataDetails.input_output_examples[0].output
    } </p>
  </div>
 </div>
  `;
};
