import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { useTask } from "../../../hooks/useTask";
import { Task } from "../../../types/task";

type Props = {
  index: number;
  trgTask: Task;
  taskList2: Array<Task>;
  setTaskList2: Dispatch<SetStateAction<Array<Task>>>;
};

export const TaskItem = (props: Props) => {
  const { index, trgTask, taskList2, setTaskList2 } = props;
  const { taskList, setTaskList } = useTask();
  const onClickDelete = (id: string) => {
    setTaskList2(taskList2.filter((trgTask) => trgTask.id !== id));
    setTaskList(taskList.filter((trgTask) => trgTask.id !== id));
  };

  return (
    <Draggable index={index} draggableId={trgTask.draggableId}>
      {(provided) => (
        <div
          key={trgTask.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex
            align="center"
            justifyContent="space-between"
            p="17px 10px"
            mt={3}
            borderRadius="5px"
            bg="white"
            shadow="md"
          >
            <Text maxW="80%">{trgTask.title}</Text>
            <IconButton
              aria-label="タスク削除ボタン"
              icon={<MdDelete />}
              w={5}
              h={5}
              onClick={() => onClickDelete(trgTask.id)}
            />
          </Flex>
        </div>
      )}
    </Draggable>
  );
};
