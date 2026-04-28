function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        Search
      </span>
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Try chocolate, milk, cereal..."
        className="h-12 w-full rounded-lg border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
      />
    </label>
  );
}

export default SearchBar;
