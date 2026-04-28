const API_ROOTS = [
  "https://world.openfoodfacts.org",
  "https://world.openfoodfacts.net",
];

const FIELDS = [
  "code",
  "product_name",
  "brands",
  "image_front_small_url",
  "image_front_url",
  "categories",
  "nutriscore_grade",
  "ingredients_text",
  "quantity",
  "serving_size",
  "countries",
  "labels",
  "allergens",
  "nutriments"
].join(",");

export async function fetchProducts({
  searchTerm = "",
  category = "",
  page = 1,
}) {
  const params = new URLSearchParams({
    search_terms: searchTerm.trim() || "food",
    page: String(page),
    page_size: "24",
    fields: FIELDS
  });

  if (category) {
    params.set("categories_tags_en", category);
  }

  const data = await fetchOpenFoodFacts(`/api/v2/search?${params}`);

  return {
    products: data.products || [],
    total: data.count || 0
  };
}

export async function fetchProductByCode(code) {
  if (!code) {
    throw new Error("Product code is required.");
  }

  const params = new URLSearchParams({
    fields: FIELDS,
  });

  const data = await fetchOpenFoodFacts(
    `/api/v2/product/${code}.json?${params}`
  );

  if (data.status !== 1 || !data.product) {
    throw new Error("Product not found.");
  }

  return data.product;
}

async function fetchOpenFoodFacts(path) {
  let lastError;

  for (const root of API_ROOTS) {
    try {
      return await fetchJson(`${root}${path}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load food data.");
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("The food database is temporarily unavailable.");
  }

  return response.json();
}
