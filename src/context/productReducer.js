export function productReducer(productState, action) {
  switch (action.type) {
    case "SORT_BY_ALL":
      return {
        ...productState,
        all: true,
        building: false,
        plumbing: false,
        electrical: false,
      };

    case "SORT_BY_BUILDING":
      return {
        ...productState,
        all: false,
        building: true,
        plumbing: false,
        electrical: false,
      };

    case "SORT_BY_PLUMBING":
      return {
        ...productState,
        all: false,
        building: false,
        plumbing: true,
        electrical: false,
      };

    case "SORT_BY_ELECTRICAL":
      return {
        ...productState,
        all: false,
        building: false,
        plumbing: false,
        electrical: true,
      };

    case "SORT_BY_SEARCH":
      return { ...productState, searchQuery: action.payload };

    default:
      return productState;
  }
}
