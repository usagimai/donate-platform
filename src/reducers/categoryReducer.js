const categoryReducer = (state = "all", action) => {
  switch (action.type) {
    case "ALL":
      return "all";
    case "TOP":
      return "top";
    case "BOTTOMS":
      return "bottoms";
    case "OUTERS":
      return "outers";
    case "TOP-MEN":
      return "top-men";
    case "ACCESSORIES":
      return "accessories";
    case "MACHU":
      return "machu";
    case "MACHU-DISCOVER":
      return "machu-discovery-series";
    case "EMAGO":
      return "emago";
    case "ALMA-DESIGN":
      return "alma-design";
    case "MITIS":
      return "mitis";
    case "OTHERS":
      return "others";
    default:
      return state;
  }
};

export default categoryReducer;
