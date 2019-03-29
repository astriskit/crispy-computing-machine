/**
 * @copyright 2019
 */
function withHook(view, hook) {
  return props => {
    let hooked = hook(props);
    return view({
      ...(view["defaultProps"] ? view.defaultProps : {}),
      ...props,
      hooked
    });
  };
}

export { withHook };
