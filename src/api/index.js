import checklistsWithItemsJsonApi
  from "../fixtures/checklists-jsonapi-response";
import checklistsWithItemsGraphQl
  from "../fixtures/checklists-jsonapi-response";

const API = {
  fetchChecklists() {
    return new Promise((resolve, reject) => {
      resolve(checklistsWithItemsJsonApi);
    });
  }
};

export default API;
