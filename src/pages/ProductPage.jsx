import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { fetchProductByCode } from "../services/openFoodFacts";

function ProductPage() {
  const { code } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadProduct() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchProductByCode(code);

        if (isCurrent) {
          setProduct(data);
        }
      } catch (requestError) {
        if (isCurrent) {
          setProduct(null);
          setError(
            requestError.message ||
              "Something went wrong while loading the product."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isCurrent = false;
    };
  }, [code]);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-[#94A3B8] transition hover:text-white"
        >
          ← Back to products
        </Link>

        {/* Loading */}
        {isLoading && (
          <div className="py-20">
            <Loader />
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <section className="mt-8 rounded-xl border border-red-400/20 bg-red-500/10 px-6 py-5">
            <h2 className="text-lg font-semibold text-red-200">
              Unable to load product
            </h2>
            <p className="mt-2 text-sm text-red-100">
              {error}
            </p>
          </section>
        )}

        {/* Product Details */}
        {!isLoading && product && (
          <ProductDetails product={product} />
        )}
      </main>
    </div>
  );
}

function ProductDetails({ product }) {
  const grade = product.nutriscore_grade?.toUpperCase() || "N/A";
  const nutriments = product.nutriments || {};

  return (
    <section className="mt-10 grid gap-10 lg:grid-cols-[420px_1fr]">
      {/* Left Side - Product Image */}
      <div>
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="aspect-square rounded-2xl bg-[#0F172A]">
            <img
              src={
                product.image_front_url ||
                product.image_front_small_url ||
                "https://via.placeholder.com/500?text=Food"
              }
              alt={product.product_name || "Food product"}
              className="h-full w-full object-contain p-6"
            />
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Fact
            label="Nutri-Score"
            value={grade}
            highlight
          />

          <Fact
            label="Quantity"
            value={product.quantity}
          />

          <Fact
            label="Serving Size"
            value={product.serving_size}
          />

          <Fact
            label="Barcode"
            value={product.code}
          />
        </div>
      </div>

      {/* Right Side - Product Content */}
      <div>
        {/* Product Heading */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#94A3B8]">
            {product.brands || "Unknown Brand"}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {product.product_name || "Unnamed Product"}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#94A3B8]">
            {product.categories ||
              "No categories listed for this product."}
          </p>
        </div>

        {/* Nutrition Metrics */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            Nutrition Overview
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Metric
              label="Energy"
              value={nutriments["energy-kcal_100g"]}
              unit="kcal"
            />

            <Metric
              label="Protein"
              value={nutriments.proteins_100g}
              unit="g"
            />

            <Metric
              label="Fat"
              value={nutriments.fat_100g}
              unit="g"
            />

            <Metric
              label="Carbs"
              value={nutriments.carbohydrates_100g}
              unit="g"
            />

            <Metric
              label="Sugars"
              value={nutriments.sugars_100g}
              unit="g"
            />

            <Metric
              label="Salt"
              value={nutriments.salt_100g}
              unit="g"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-10">
          <InfoPanel title="Ingredients">
            {product.ingredients_text ||
              "No ingredients listed."}
          </InfoPanel>
        </div>

        {/* Labels + Allergens */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <InfoPanel title="Labels">
            {product.labels || "No labels listed."}
          </InfoPanel>

          <InfoPanel title="Allergens">
            {product.allergens || "No allergens listed."}
          </InfoPanel>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value, highlight = false }) {
  return (
    <div className="border-b border-white/10 pb-4">
      <p className="text-sm text-[#94A3B8]">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-semibold ${
          highlight ? "text-[#E2E8F0]" : "text-white"
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  );
}

function Metric({ label, value, unit }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <p className="text-sm text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-3 text-2xl font-semibold text-white">
        {value ?? "N/A"}

        {value !== undefined && (
          <span className="ml-1 text-sm font-medium text-[#94A3B8]">
            {unit}
          </span>
        )}
      </p>

      <p className="mt-1 text-xs text-[#64748B]">
        per 100g
      </p>
    </div>
  );
}

function InfoPanel({ title, children }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-4 text-base leading-8 text-[#94A3B8]">
        {children}
      </p>
    </div>
  );
}

export default ProductPage;