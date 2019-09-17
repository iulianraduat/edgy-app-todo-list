import EdgyApi, { JsonEdgyObject } from 'edgy-api';
import EditableDndList, { Task } from 'editable-dnd-list';
import React, { useState } from 'react';
import Api from '../api/ApiExt';
import { getTodoEventObject, getTodoListObject } from '../api/TodoObjects';
import CreateListLayout from './CreateListLayout';
import Name from './Name';
import SaveButton from './SaveButton';
import SaveMessage from './SaveMessage';

interface CreateListProps {}

const CreateList: React.FC<CreateListProps> = () => {
  const [name, setName] = useState<string>('');
  const [items, setItems] = useState<Task[]>([]);
  const [message, setMessage] = useState<string | undefined>();

  const handleChangeName = (newName: string) => {
    setName(newName);
    setMessage(undefined);
  };

  const handleChangeItems = (newItems: Task[]) => {
    setItems(newItems);
    setMessage(undefined);
  };

  const handleSave = React.useCallback(async () => {
    setMessage('All tasks were saved');

    const idSavedEvents: string[] = (await Promise.all(
      items.map((item: Task) => {
        const obj = getTodoEventObject(Api, undefined, item.text);
        return saveObjectWithRetry(Api, obj, 3);
      })
    )).filter((id?: string) => id !== undefined) as string[];

    if (idSavedEvents.length === 0) {
      setMessage('No task could be saved');
      return;
    }

    if (idSavedEvents.length !== items.length) {
      setMessage('Not all tasks were saved');
    }

    const obj = getTodoListObject(Api, name, idSavedEvents);
    const idTodoList = await saveObjectWithRetry(Api, obj, 3);

    if (idTodoList === undefined) {
      setMessage('Failed to save');
      return;
    }

    setName('');
    setItems([]);
  }, [items, name, setMessage]);

  return (
    <CreateListLayout
      name={<Name name={name} onChange={handleChangeName} />}
      saveButton={<SaveButton isDisabled={name.length === 0 || items.length === 0} onClick={handleSave} />}
      saveMessage={<SaveMessage open={message !== undefined} message={message} />}
      list={<EditableDndList items={items} onChange={handleChangeItems} />}
    />
  );
};

const saveObjectWithRetry = async (api: EdgyApi, obj: JsonEdgyObject, retries: number): Promise<string | undefined> => {
  for (let i = 0; i < retries; i++) {
    const savedObject = await api.saveObject(obj);
    if (savedObject instanceof Error) {
      continue;
    }
    return savedObject.id;
  }
};

export default CreateList;
