import checklistsWithItemsJsonApi
  from "../fixtures/checklists-jsonapi-response";
import checklistsWithItemsGraphQl
  from "../fixtures/checklists-graphql-response";

const API = {
  fetchJsonApiChecklists() {
    return new Promise((resolve, reject) => {
      resolve(checklistsWithItemsJsonApi);
    });
  },
  fetchGraphQLChecklists() {
    return new Promise((resolve, reject) => {
      resolve(checklistsWithItemsGraphQl);
    });
  }
};

export default API;
