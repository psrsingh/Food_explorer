function Loader() {
  return (
    <div className="flex min-h-80 items-center justify-center" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-emerald-300" />
      <span className="sr-only">Loading products</span>
    </div>
  );
}

export default Loader;
