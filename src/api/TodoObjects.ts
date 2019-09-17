import Api, { JsonEdgyObject } from 'edgy-api';
import { Task } from 'list-of-todos';
import { DateTime } from 'luxon';
import { COMPLETED, Event, NEEDS_ACTION } from './Event';

export const getTodoEventObject = (
  api: Api,
  id: string | undefined,
  description: string,
  done?: boolean
): JsonEdgyObject => ({
  id,
  name: 'TODO-TASK',
  type: 'EVENT',
  data: {
    summary: description,
    description,
    percentComplete: done ? 100 : 0,
    status: done ? COMPLETED : NEEDS_ACTION,
    completed: done ? getNow() : undefined
  } as Event,
  version: {
    changelog: getChangelog(done)
  },
  owner: {
    id: api.getAccountId()
  }
});

export const getTodoListObject = (api: Api, name: string, taskEventIds: string[]): JsonEdgyObject => ({
  name,
  type: 'APP-CFG',
  data: {
    taskEventIds
  },
  owner: {
    id: api.getAppId()
  }
});

const getNow = () => DateTime.utc().toISO();

const getChangelog = (done?: boolean) => (done ? 'Marked as done' : 'Marked as not done');

export const getJsonEdgyObjectToTask = (item: JsonEdgyObject | Error): Task | undefined => {
  if (item instanceof Error) {
    return undefined;
  }

  const { id, data } = item;
  const { description, status } = data as Event;

  return {
    id: id as string,
    text: description,
    done: status === COMPLETED
  };
};
