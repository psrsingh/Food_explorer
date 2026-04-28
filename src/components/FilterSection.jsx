const categories = [
  { label: "All categories", value: "" },
  { label: "Beverages", value: "beverages" },
  { label: "Snacks", value: "snacks" },
  { label: "Dairy", value: "dairies" },
  { label: "Bakery", value: "bakery" },
  { label: "Breakfast", value: "breakfasts" },
];

function FilterSection({ category, setCategory }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        Category
      </span>
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="h-12 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
      >
        {categories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default FilterSection;
