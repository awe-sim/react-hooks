# React Hook - useShadowState

# 1. Installation

```sh
npm i --save @awesim/use-shadow-state
```

```sh
yarn add @awesim/use-shadow-state
```

# 2. Introduction

A shadow state is one that mirrors an existing state, but is isolated from the underlying state. This allows the caller to change the shadow state without affecting the underlying state.

An important use case for this is if we have a dialog that allows changing a state. We would want the changes to reflect inside the dialog, but we don't want to affect the underlying state and affect the rest of the application. The underlying state should be updated only when the user interacts with the `OK` button. The user may also reset the state of dialog.

```Typescript
// Underlying state defined in parent component
const [name, setName] = useState('User name');


// Inside dialog
const [shadowName, setShadowName, { isDirty, apply, revert }] = useShadowState(name, setName);

const onClickSave = useCallback(() => {
  apply();
}, [apply]);

const onClickReset = useCallback(() => {
  revert();
}, [revert]);

return (
  <Dialog>
    <input value={shadowName} onChange={ev => setShadowName(ev.target.value)}>
    {isDirty && <span>*</span>}
    <button onClick={onClickSave}>Save</button>
    <button onClick={onClickReset}>Reset</button>
  </Dialog>
);
```

# 3. `useShadowState()`

The hook accepts 3 parameters:
1. `value`: Underlying state value.
2. `setValue`: Setter for underlying state value.
3. `id`: (Optional) ID for logging/troubleshooting purposes.

And returns an array that can be destructured as follows:
1. `shadowValue`: Shadowed value.
2. `setShadowValue`: Setter for shadowed value.
3. An object that can be further destructured as follows:
   1. `apply`: Propagates shadow value changes back to the underlying state.
   2. `revert`: Resets shadow value back to the underlying state value.
   3. `isDirty`: Flag indicating if shadow value has been changed.
