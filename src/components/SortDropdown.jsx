function SortDropdown({ sortBy, setSortBy }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        Sort
      </span>
      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="h-12 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
      >
        <option value="">Relevance</option>
        <option value="name">Product name</option>
        <option value="ingredients">Most ingredients</option>
        <option value="nutrition">Best nutrition score</option>
      </select>
    </label>
  );
}

export default SortDropdown;
