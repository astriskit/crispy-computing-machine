function listReducer(list, action) {
  switch (action.type) {
    case "ADD_TODO": {
      let maxIndex = 0;
      const listCopy = [...list];
      listCopy.forEach(({ id }) => {
        if (id > maxIndex) {
          maxIndex = id;
        }
      });
      listCopy.push({
        id: maxIndex + 1,
        title: action.payload,
        completed: false
      });
      return listCopy;
    }
    case "REMOVE_TODO": {
      return list.filter(item => action.payload !== item.id);
    }
    case "UPDATE_TODO": {
      return list.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        } else {
          return item;
        }
      });
    }
    case "TOGGLE_DONE_TODO": {
      return list.map(item => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    }
    case "RESET": {
      return action.payload;
    }
    default:
      return list;
  }
}

export default listReducer;
