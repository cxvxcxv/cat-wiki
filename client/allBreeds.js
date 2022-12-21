const getAllBreeds = () => {
  fetch("http://localhost:5000/api/breeds/")
    .then((res) => res.json())
    .then((data) => {
      createOptions(data);
      return data;
    });
};
getAllBreeds();

const getOneBreed = (id) => {
  return fetch(`http://localhost:5000/api/breeds/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const createOptions = async (allBreeds) => {
  let select = document.getElementById("breed_selector");
  for (let i = 0; i < allBreeds.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = `${allBreeds[i].name}`;
    option.value = allBreeds[i].id;
    select.appendChild(option);
  }
  select.onchange = async () => {
    const selectedElement = select.value;
    const data = await getOneBreed(selectedElement);
    renderInfo(data);
  };
};

const renderInfo = (data) => {
  var breed_info = window.open("", "_self");
  breed_info.document.write(`
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/cat-info.css">
    <title>${data.name}</title>
</head>
<body>
    <section class="logo-space">
        <img src="img/CatwikiLogo.svg">
    </section>
    <section class="wrapper">
        <section class="info">
            <img src=${data.images[0].url}>
						<div class="text-info">
                <h1>${data.name}</h1>
                <p>${data.description}</p>
                <h5>Temperament: ${data.temperament}</h5>
                <h5>Origin: ${data.origin}</h5>
                <h5>Life Span: ${data.life_span} years</h5>
                <h5>Affection level: ${data.affection_level} / 5</h5>
                <h5>Child Friendly: ${data.child_friendly} / 5</h5>
                <h5>Grooming: ${data.grooming} / 5</h5>
                <h5>Intelligence: ${data.intelligence} / 5</h5>
                <h5>Health issues: ${data.health_issues} / 5</h5>
                <h5>Social needs: ${data.social_needs} / 5</h5>
                <h5>Stranger friendly: ${data.stranger_friendly} / 5</h5>
								<div class="bar-info">

								</div>
            </div>
        </section>
        <section>
            <h1>Other photos</h1>
            <div class="photos">
                <img src=${data.images[1]?.url}>
                <img src=${data.images[2]?.url}>
  							<img src=${data.images[3]?.url}>
  							<img src=${data.images[4]?.url}>
  							<img src=${data.images[5]?.url}>
  							<img src=${data.images[6]?.url}>
  							<img src=${data.images[7]?.url}>
  							<img src=${data.images[8]?.url}>
            </div>
        </section>
        <footer>
            <img src="./img/CatwikiLogo.svg" alt="" />
            <p>&#169; created by cxv, oiibar - devChallenge.io 2021</p>
          </footer>
    </section>
</body>
</html>
	`);
};