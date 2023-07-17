export default function Filter({handleSort, sortBy}) {

    return (
      <div className="flex gap-1 bg-[#cff3fd] p-[2px] font-helvetica ">
        <button
          className={`sort-btn ${sortBy === "all" ? "selected" : ""}`}
          onClick={handleSort}
        >
          All
        </button>
        <button
          className={`sort-btn ${sortBy === "building" ? "selected" : ""}`}
          onClick={handleSort}
        >
          Building
        </button>
        <button
          className={`sort-btn ${sortBy === "plumbing" ? "selected" : ""}`}
          onClick={handleSort}
        >
          Plumbing
        </button>
        <button
          className={`sort-btn ${sortBy === "electrical" ? "selected" : ""}`}
          onClick={handleSort}
        >
          Electrical
        </button>
      </div>
    );
}