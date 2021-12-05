import { userTest } from './user';
import { todoTest } from './todo';
import { inProgressTest } from './inProgress';
import { doneTest } from './done';

describe('testSuite test case', () => {
  userTest();
  todoTest();
  inProgressTest();
  doneTest();
});
