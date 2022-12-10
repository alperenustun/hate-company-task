import uuid from "react-uuid";

export const getComments = async () => {
    return [
      {
        id: "1",
        body: "First comment",
        username: "William",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
        likes: 5,
      },
      {
        id: "2",
        body: "Second comment",
        username: "Henry",
        userId: "2",
        parentId: null,
        createdAt: "2022-03-16T23:00:33.010+02:00",
        likes: 12,
      },
      {
        id: "3",
        body: "First comment first child",
        username: "Henry",
        userId: "2",
        parentId: "1",
        createdAt: "2022-04-16T23:00:33.010+02:00",
        likes: 2,
      },
      {
        id: "4",
        body: "Second comment second child",
        username: "William",
        userId: "2",
        parentId: "2",
        createdAt: "2022-05-16T23:00:33.010+02:00",
        likes: 58,
      },
    ];
  };
  
  export const createComment = async (text, parentId = null) => {
    return {
      id: uuid(),
      body: text,
      parentId,
      userId: "1",
      username: "John",
      createdAt: new Date().toISOString(),
      likes: 0,
    };
  };
  
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };
  