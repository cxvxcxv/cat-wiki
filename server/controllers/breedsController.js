export const getAllBreeds = async (req, res) => {
  let allBreeds = [];
  const fetchBreed = async () => {
    const URL_ALL_BREEDS = `https://api.thecatapi.com/v1/breeds`;
    await fetch(URL_ALL_BREEDS, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map((element) => {
          allBreeds.push({
            name: element.name,
            id: element.id,
          });
        });
      })
      .then((data) => JSON.stringify(allBreeds));
  };
  await fetchBreed();
  res.status(200).json(allBreeds);
  allBreeds = [];
};

export const getOneBreedInfo = async (req, res) => {
  let oneBreedInfo = {};
  let oneBreedImages = [];
  const { id } = req.params;
  const URL_BREED_IMAGE = `https://api.thecatapi.com/v1/images/search?limit=9&breed_ids=${id}`;
  const URL_ALL_BREEDS = `https://api.thecatapi.com/v1/breeds`;

  await fetch(URL_BREED_IMAGE, {
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.map((el) => {
        oneBreedImages.push({ url: el.url });
      });
    })
    .then((data) => JSON.stringify(oneBreedImages));

  await fetch(URL_ALL_BREEDS, {
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.map((el) => {
        if (id == el.id) {
          oneBreedInfo = {
            name: el.name,
            description: el.description,
            temperament: el.temperament,
            origin: el.origin,
            life_span: el.life_span,
            adaptability: el.adaptability,
            affection_level: el.affection_level,
            child_friendly: el.child_friendly,
            grooming: el.grooming,
            intelligence: el.intelligence,
            health_issues: el.health_issues,
            social_needs: el.social_needs,
            stranger_friendly: el.stranger_friendly,
            images: oneBreedImages,
          };
        }
      });
    })
    .then((data) => JSON.stringify(oneBreedInfo));
  res.status(200).json(oneBreedInfo);
  oneBreedImages = [];
};
  