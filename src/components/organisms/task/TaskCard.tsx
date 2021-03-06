import { FC, memo, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

import { TaskCardDeleteButton } from "../../atoms/button/TaskCardDeleteButton";
import { TaskAddInput } from "../../atoms/input/TaskAddInput";
import { TaskCardTitleInput } from "../../atoms/input/TaskCardTitleInput";
import { Tasks } from "../../molecules/task/Tasks";
import { Task } from "../../../types/task";
import { TaskList } from "../../../types/taskList";
import { useTask } from "../../../hooks/useTask";

type Props = {
  index: number;
  taskCard: TaskList;
};

export const TaskCard: FC<Props> = memo((props) => {
  const { index, taskCard } = props;
  const { globalTaskList, setGlobalTaskList } = useTask();
  const [tasks, setTasks] = useState<Array<Task>>(
    globalTaskList.filter((t) => t.cardId === taskCard.id)
  );

  return (
    <>
      <Draggable draggableId={taskCard.id} index={index}>
        {(provided) => (
          <Box
            w="280px"
            px={2}
            py={4}
            m="10px 1%"
            bg="gray.100"
            borderRadius="10px"
            shadow="md"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Flex justifyContent="space-between" {...provided.dragHandleProps}>
              <TaskCardTitleInput taskCard={taskCard} />
              <TaskCardDeleteButton taskCard={taskCard} />
            </Flex>
            <TaskAddInput
              taskList={tasks}
              setTaskList={setTasks}
              globalTaskList={globalTaskList}
              setGlobalTaskList={setGlobalTaskList}
              cardId={taskCard.id}
            />
            <Tasks taskList={tasks} setTaskList={setTasks} />
          </Box>
        )}
      </Draggable>
    </>
  );
});
