import { FC, memo, useCallback, useEffect } from "react";
import { Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { TaskCardAddButton } from "../atoms/button/TaskCardAddButton";
import { TaskCard } from "../organisms/task/TaskCard";
import { useTaskList } from "../../hooks/useTaskList";
import { useUserTask } from "../../hooks/useUserTask";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSearchTask } from "../../hooks/useSearchTask";

export const Home: FC = memo(() => {
  const { globalTaskCardList, setGlobalTaskCardList } = useTaskList();
  const { getUserTask, loading } = useUserTask();
  const { loginUser } = useLoginUser();
  const { searchTaskText } = useSearchTask();

  useEffect(() => {
    if (loginUser === null) return;
    getUserTask(loginUser?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEndCard = useCallback(
    (res: DropResult) => {
      if (res.destination?.index === undefined) {
        return;
      }
      const startIndex = res.source.index;
      const endIndex = res.destination?.index;
      const newList = [...globalTaskCardList];
      const item = newList.splice(startIndex, 1);
      newList.splice(endIndex, 0, item[0]);
      setGlobalTaskCardList(newList);
    },
    [globalTaskCardList, setGlobalTaskCardList]
  );
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <DragDropContext onDragEnd={onDragEndCard}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <Wrap
                p={{ base: 4, md: 10 }}
                justify="flex-start"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {globalTaskCardList
                  .filter((card) =>
                    card.title.toUpperCase().match(searchTaskText.toUpperCase())
                  )
                  .map((taskCard, index) => (
                    <WrapItem key={taskCard.id}>
                      <TaskCard index={index} taskCard={taskCard} />
                    </WrapItem>
                  ))}
                {provided.placeholder}
                <WrapItem>
                  <TaskCardAddButton />
                </WrapItem>
              </Wrap>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
});
