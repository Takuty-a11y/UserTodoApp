import { Input } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../../../types/task";

type Props = {
  taskList: Array<Task>;
  setTaskList: Dispatch<SetStateAction<Array<Task>>>;
  taskList2: Array<Task>;
  setTaskList2: Dispatch<SetStateAction<Array<Task>>>;
  cardId: string;
};

export const TaskAddInput: FC<Props> = (props) => {
  const [inputText, setInputText] = useState("");
  const { taskList, setTaskList, taskList2, setTaskList2, cardId } = props;

  const onSubmitTaskAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // タスク追加[NullOrWhiteSpaceは追加しない]
    if (inputText && inputText.match(/\S/g)) {
      const taskId = uuidv4();
      setTaskList([
        ...taskList,
        {
          cardId: cardId,
          id: taskId,
          title: inputText,
          completed: false,
          draggableId: `item-${taskId}`,
        },
      ]);
      setTaskList2([
        ...taskList2,
        {
          cardId: cardId,
          id: taskId,
          title: inputText,
          completed: false,
          draggableId: `item-${taskId}`,
        },
      ]);
    }
    setInputText("");
  };
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitTaskAdd}>
        <Input
          size="md"
          fontSize="1.1rem"
          bg="white"
          placeholder="タスクを追加"
          onChange={onChangeText}
          value={inputText}
        />
      </form>
    </div>
  );
};
