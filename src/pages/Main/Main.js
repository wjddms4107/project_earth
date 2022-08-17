const { observable } = require('mobx');

export default function Main() {
  const state = observable({
    compA: 'a',
    compB: 12,
    compC: null,
  });

  const onClick = () => {
    state.compA = 'alpha';
    console.log(state.compA);
  };
  console.log(state.compA);
  return (
    <div>
      <p className="text-3xl font-bold underline">Hello world!</p>
      <p className="">123</p>
      <button
        className="py-2 px-4 rounded-lg shadow-md text-white bg-blue-500"
        onClick={() => onClick()}
      >
        {state.compA}
      </button>
    </div>
  );
}
