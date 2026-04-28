import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl text-center shadow-lg">
        <div className="mb-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-slate-300">
          No Results Found
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-white">
          No products found
        </h2>

        <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
          Try using a broader keyword, removing filters, or switching to
          another category to discover more food products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.code} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;