import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import SortDropdown from "../components/SortDropdown";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { fetchProducts } from "../services/openFoodFacts";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("food");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadProducts() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchProducts({
          searchTerm,
          category,
          page,
        });

        if (isCurrent) {
          setProducts(data.products || []);
        }
      } catch (requestError) {
        if (isCurrent) {
          setProducts([]);
          setError(
            requestError.message ||
              "Something went wrong while loading products."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isCurrent = false;
    };
  }, [searchTerm, category, page]);

  const sortedProducts = useMemo(() => {
    const nextProducts = [...products];

    if (sortBy === "name") {
      nextProducts.sort((a, b) =>
        (a.product_name || "").localeCompare(b.product_name || "")
      );
    }

    if (sortBy === "ingredients") {
      nextProducts.sort(
        (a, b) =>
          (b.ingredients_text?.length || 0) -
          (a.ingredients_text?.length || 0)
      );
    }

    if (sortBy === "nutrition") {
      nextProducts.sort((a, b) =>
        (a.nutriscore_grade || "z").localeCompare(
          b.nutriscore_grade || "z"
        )
      );
    }

    return nextProducts;
  }, [products, sortBy]);

  function updateSearchTerm(value) {
    setSearchTerm(value);
    setPage(1);
  }

  function updateCategory(value) {
    setCategory(value);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#94A3B8]">
            Open Food Facts Database
          </p>

          <div className="mt-6 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Discover premium
              <span className="block text-[#CBD5E1]">
                food product insights
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8]">
              Search products, compare nutrition quality, analyze ingredients,
              and explore food data with a clean, minimal and modern premium
              experience.
            </p>
          </div>

          {/* Minimal Stats */}
          <div className="mt-12 flex flex-wrap gap-12">
            <div>
              <p className="text-3xl font-semibold text-white">100K+</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Products Indexed
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-white">Live</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Real-time Database
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-white">Smart</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Better Nutrition Sorting
              </p>
            </div>
          </div>
        </section>

        {/* SEARCH + FILTER */}
        <section className="mb-14">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-white">
              Search Products
            </h2>

            <p className="mt-2 text-[#94A3B8]">
              Fast, clean and structured product discovery.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_220px_220px] items-start">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={updateSearchTerm}
            />

            <FilterSection
              category={category}
              setCategory={updateCategory}
            />

            <SortDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-4">
            <p className="font-medium text-red-300">
              Failed to load products
            </p>

            <p className="mt-1 text-sm text-red-200">
              {error}
            </p>
          </div>
        )}

        {/* RESULTS */}
        <section className="mb-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">
                Results
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Explore Products
              </h2>
            </div>

            {!isLoading && (
              <p className="text-sm text-[#94A3B8]">
                {sortedProducts.length} products found • Page {page}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="py-20">
              <Loader />
            </div>
          ) : (
            <ProductGrid products={sortedProducts} />
          )}
        </section>

        {/* PAGINATION */}
        <section className="border-t border-white/10 pt-6">
          <Pagination
            page={page}
            setPage={setPage}
            disabled={isLoading}
          />
        </section>
      </main>
    </div>
  );
}

export default Home;