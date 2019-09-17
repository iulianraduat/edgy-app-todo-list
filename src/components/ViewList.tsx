import { JsonEdgyObject } from 'edgy-api';
import ListOfTodos from 'list-of-todos';
import React, { useEffect } from 'react';
import Api from '../api/ApiExt';
import { getJsonEdgyObjectToTask, getTodoEventObject } from '../api/TodoObjects';

interface Task {
  id: string;
  done?: boolean;
  text: string;
}

export interface ViewListProps {
  taskEventIds: string[];
}

const ViewList: React.FC<ViewListProps> = ({ taskEventIds }) => {
  const [items, setItems] = React.useState<Task[]>();

  useEffect(() => {
    (async () => {
      const objs: (JsonEdgyObject | Error)[] = await Promise.all(getTaskEventByIds(taskEventIds));

      const tasks: Task[] = objs
        .map(getJsonEdgyObjectToTask)
        .filter((item: Task | undefined) => item !== undefined) as Task[];

      setItems(tasks);
    })();
  }, [setItems, taskEventIds]);

  if (items === undefined) {
    return <div>Loading...</div>;
  }

  const handleChange = (items: Task[], updatedItem: Task) => {
    setItems(items);

    const updatedEvent = getTodoEventObject(Api, updatedItem.id, updatedItem.text, updatedItem.done);
    Api.updateObject(updatedEvent, undefined, () =>
      setItems(items.map((item: Task) => (item.id !== updatedItem.id ? item : { ...item, done: !updatedItem.done })))
    );
  };

  return <ListOfTodos items={items} onChange={handleChange} />;
};

const getTaskEventByIds = (taskEventIds: string[]) => taskEventIds.map(getTaskEventById);

const getTaskEventById = (taskEventId: string) =>
  (Api.getObject(taskEventId, undefined, ['id', 'data']) as unknown) as (JsonEdgyObject | Error);

export default ViewList;
