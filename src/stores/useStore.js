import { useLocalObservable } from 'mobx-react-lite';

export const useStore = () => {
  const store = useLocalObservable(() => ({
    todos: [],
    inputValue: '',
    onInputValueChange(e) {
      store.inputValue = e.target.value;
    },
    onDeleteClick(index) {
      return () => {
        store.todos.splice(index, 1);
      };
    },
    onInputKeypress(e) {
      if (store.inputValue === '') {
        return;
      }
      const todo = {
        text: store.inputValue,
      };
      if (e.key === 'Enter') {
        store.todos = [...store.todos, todo];
        store.inputValue = '';
      }
    },
  }));
  return store;
};
