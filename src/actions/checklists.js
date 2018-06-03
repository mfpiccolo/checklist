import normalize from "json-api-normalizer";

const fetchChecklistRequestAction = () => {
  return {
    type: "FETCH_CHECKLISTS_REQUEST"
  };
};

const fetchChecklistsSuccessAction = checklists => {
  return {
    type: "FETCH_CHECKLISTS_SUCCESS",
    payload: checklists
  };
};

const fetchChecklistsErrorAction = errorMessage => {
  return {
    type: "FETCH_CHECKLISTS_ERROR",
    payload: { errorMessage },
    error: true
  };
};

export function fetchChecklists() {
  return async dispatch => {
    try {
      dispatch(fetchChecklistRequestAction());
      const checklists = await API.fetchChecklists();

      dispatchUpdateResourceByID(dispatch, { jsonApiPayload: checklists });
    } catch (error) {
      dispatch(fetchChecklistsErrorAction(error));
    }
  };
}

const API = {
  fetchChecklists() {
    return new Promise((resolve, reject) => {
      resolve(checklistsWithItemsJsonApi);
    });
  }
};

const checklistsWithItemsJsonApi = {
  links: {
    self: "http://example.com/checklists",
    next: "http://example.com/checklists?page[offset]=2",
    last: "http://example.com/checklists?page[offset]=10"
  },
  data: [
    {
      type: "checklists",
      id: "1",
      attributes: {
        name: "Onboarding"
      },
      relationships: {
        tasks: {
          links: {
            self: "http://example.com/checklists/1/relationships/tasks",
            related: "http://example.com/checklists/1/tasks"
          },
          data: [{ type: "tasks", id: "1" }, { type: "tasks", id: "2" }]
        }
      },
      links: {
        self: "http://example.com/checklists/1"
      }
    },
    {
      type: "checklists",
      id: "2",
      attributes: {
        name: "Project Audit"
      },
      relationships: {
        tasks: {
          links: {
            self: "http://example.com/checklists/2/relationships/tasks",
            related: "http://example.com/checklists/2/tasks"
          },
          data: [{ type: "tasks", id: "3" }, { type: "tasks", id: "4" }]
        }
      },
      links: {
        self: "http://example.com/checklists/2"
      }
    },
    {
      type: "checklists",
      id: "3",
      attributes: {
        name: "QA Checklist"
      },
      relationships: {
        tasks: {
          links: {
            self: "http://example.com/checklists/3/relationships/tasks",
            related: "http://example.com/checklists/3/tasks"
          },
          data: [{ type: "tasks", id: "5" }, { type: "tasks", id: "6" }]
        }
      },
      links: {
        self: "http://example.com/checklists/3"
      }
    }
  ],
  included: [
    {
      type: "tasks",
      id: "1",
      attributes: {
        description: "Onboarding 1"
      },
      links: {
        self: "http://example.com/tasks/1"
      }
    },
    {
      type: "tasks",
      id: "2",
      attributes: {
        description: "Onboarding 2"
      },
      links: {
        self: "http://example.com/tasks/2"
      }
    },
    {
      type: "tasks",
      id: "3",
      attributes: {
        description: "Project Audit 3"
      },
      links: {
        self: "http://example.com/tasks/3"
      }
    },
    {
      type: "tasks",
      id: "4",
      attributes: {
        description: "Project Audit 4"
      },
      links: {
        self: "http://example.com/tasks/4"
      }
    },
    {
      type: "tasks",
      id: "5",
      attributes: {
        description: "QA Checklist 5"
      },
      links: {
        self: "http://example.com/tasks/5"
      }
    },
    {
      type: "tasks",
      id: "6",
      attributes: {
        description: "QA Checklist 6"
      },
      links: {
        self: "http://example.com/tasks/6"
      }
    }
  ]
};

// TODO: Framework Code
const dispatchUpdateResourceByID = (
  dispatch,
  { jsonApiPayload, graphQlPayload }
) => {
  if (jsonApiPayload) {
    const normalizedResources = normalize(jsonApiPayload);
    Object.entries(
      normalizedResources
    ).forEach(([resourceIdentifier, resources]) => {
      Object.entries(
        resources
      ).forEach(([id, { type, attributes, links, relationships }]) => {
        dispatch({
          type: "ADD_OR_REPLACE_RESOURCE_BY_ID",
          spec: "jsonApi",
          resourceType: type,
          id,
          attributes,
          links,
          relationships
        });
      });
    });
  } else if (graphQlPayload) {
  }
};
