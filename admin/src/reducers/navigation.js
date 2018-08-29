export default function navigation(state = {}, action) {
  if (action.type === 'NAVIGATE_TO') {
    return {
      path: action.path,
    };
  }
  return state;
}
