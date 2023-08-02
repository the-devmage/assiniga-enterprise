export default function DateFilter({ sortBy, setSortBy }) {
  return (
    <div className="flex gap-1 bg-[#cff3fd] p-[2px] font-helvetica rounded-md ">
      <button
        className={`sort-btn ${sortBy === 7 ? "selected" : ""}`}
        onClick={() => setSortBy(7)}
      >
        Past 7 Days
      </button>
      <button
        className={`sort-btn ${sortBy === 30 ? "selected" : ""}`}
        onClick={() => setSortBy(30)}
      >
        Past 30 Days
      </button>
      <button
        className={`sort-btn ${sortBy === 365 ? "selected" : ""}`}
        onClick={() => setSortBy(365)}
      >
        Past year
      </button>
    </div>
  );
}
