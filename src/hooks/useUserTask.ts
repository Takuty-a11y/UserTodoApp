import { useCallback, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { Todo } from "../types/api/todo";
import { useTaskList } from "./useTaskList";
import { useTask } from "./useTask";
import { Task } from "../types/task";

export const useUserTask = () => {
  const [loading, setLoading] = useState(false);
  const { setTaskCardList } = useTaskList();
  const { setTaskList } = useTask();
  const getUserTask = useCallback(
    (id: number) => {
      setLoading(true);
      //仮に自作する
      setTaskCardList([
        {
          id: "0",
          title: "Today0",
          completed: false,
          draggableId: "card-0",
        },
        {
          id: "1",
          title: "Today1",
          completed: false,
          draggableId: "card-1",
        },
        {
          id: "2",
          title: "Today2",
          completed: false,
          draggableId: "card-2",
        },
        {
          id: "3",
          title: "Today3",
          completed: false,
          draggableId: "card-3",
        },
      ]);
      axios
        .get<Array<Todo>>("https://jsonplaceholder.typicode.com/todos", {
          params: { userId: id },
        })
        .then((res) => {
          const arr: Array<Task> = [];
          res.data.map((todo) =>
            arr.push({
              cardId: `${todo.id % 4}`,
              id: uuidv4(),
              title: todo.title,
              completed: todo.completed,
              draggableId: `item-${uuidv4()}`,
            })
          );
          setTaskList(arr);
        })
        .catch(() => {
          setTaskList([
            {
              cardId: "1",
              id: "",
              title: "",
              completed: false,
              draggableId: "",
            },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setTaskCardList, setTaskList]
  );
  return { getUserTask, loading };
};
