import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const grade = product.nutriscore_grade?.toUpperCase() || "N/A";

  const getGradeColor = (grade) => {
    const colors = {
      A: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
      B: "bg-lime-500/15 text-lime-300 border-lime-400/30",
      C: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30",
      D: "bg-orange-500/15 text-orange-300 border-orange-400/30",
      E: "bg-red-500/15 text-red-300 border-red-400/30",
      "N/A": "bg-slate-500/15 text-slate-300 border-slate-400/20",
    };

    return colors[grade] || colors["N/A"];
  };

  return (
    <Link
      to={`/products/${product.code}`}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/20 hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)]"
    >
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-emerald-400/[0.03] opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
        <img
          src={
            product.image_front_small_url ||
            "https://via.placeholder.com/400x300?text=Food+Product"
          }
          alt={product.product_name || "Food product"}
          className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* NutriScore Badge */}
        <div
          className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${getGradeColor(
            grade
          )}`}
        >
          Grade {grade}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <div className="mb-4">
          <h2 className="line-clamp-2 min-h-[56px] text-lg font-semibold tracking-tight text-white">
            {product.product_name || "Unnamed Product"}
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-400">
            {product.brands || "Unknown Brand"}
          </p>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3">
          <ProductMeta label="Quantity" value={product.quantity} />
          <ProductMeta
            label="Ingredients"
            value={
              product.ingredients_text
                ? `${product.ingredients_text.length} chars`
                : "N/A"
            }
          />
        </div>
      </div>
    </Link>
  );
}

function ProductMeta({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm transition hover:border-white/10">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 truncate text-sm font-semibold text-slate-200">
        {value || "N/A"}
      </p>
    </div>
  );
}

export default ProductCard;