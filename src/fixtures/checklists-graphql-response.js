export default {
  meta: {
    total: 3,
    count: 3,
    offset: 0,
    error: null
  },
  data: [
    {
      id: 7,
      __typename: "Checklist",
      name: "Onboarding GraphQL",
      tasks: [
        {
          id: 7,
          __typename: "Task",
          description: "Onboarding Graph 1"
        },
        {
          id: 8,
          __typename: "Task",
          description: "Onboarding Graph 1"
        }
      ]
    },
    {
      id: 8,
      __typename: "Checklist",
      name: "Project Audit GraphQL",
      tasks: [
        {
          id: 9,
          __typename: "Task",
          description: "Project Audit Graph 1"
        },
        {
          id: 10,
          __typename: "Task",
          description: "Project Audit Graph 1"
        }
      ]
    },
    {
      id: 9,
      __typename: "Checklist",
      name: "QA Checklist GraphQL",
      tasks: [
        {
          id: 11,
          __typename: "Task",
          description: "QA Checklist Graph 1"
        },
        {
          id: 12,
          __typename: "Task",
          description: "QA Checklist Graph 1"
        }
      ]
    }
  ]
};
