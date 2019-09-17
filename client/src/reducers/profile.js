const initialState = {};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'value':
      return {};

    default:
      return state;
  }
};
