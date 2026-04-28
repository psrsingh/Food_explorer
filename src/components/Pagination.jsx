function Pagination({ page, setPage, disabled }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
        disabled={page === 1 || disabled}
        className="h-10 rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-45"
      >
        Previous
      </button>

      <span className="min-w-20 text-center text-sm font-medium text-slate-300">
        Page {page}
      </span>

      <button
        type="button"
        onClick={() => setPage((currentPage) => currentPage + 1)}
        disabled={disabled}
        className="h-10 rounded-lg bg-emerald-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-45"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
