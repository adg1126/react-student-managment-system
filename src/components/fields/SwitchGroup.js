// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';

// const SwitchGroup = ({ options, input }) => {
//   const switchGroup = () =>
//     options.map((option, i) => (
//       <FormControlLabel
//         key={i}
//         control={
//           <Switch
//             name={`${input.name}[${i}]`}
//             value={option.name}
//             checked={input.value.indexOf(option.name) !== -1}
//             onChange={event => {
//               const newValue = [...input.value];

//               event.target.checked
//                 ? newValue.push(option.name)
//                 : newValue.splice(newValue.indexOf(option.name), 1);

//               return input.onChange(newValue);
//             }}
//           />
//         }
//         label={option.name}
//       />
//     ));
//   return <div>{switchGroup()}</div>;
// };

// export default SwitchGroup;

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchGroup = ({ options, input }) => {
  const switchGroup = () =>
    options.map((option, i) => (
      <FormControlLabel
        style={{ margin: i !== 0 ? '0.8em 0' : '0.8em 0' }}
        key={i}
        control={
          <Switch
            name={`${input.name}[${i}]`}
            value={option.name}
            checked={input.value.indexOf(option.name) !== -1}
            onChange={event => {
              const newValue = [...input.value];
              event.target.checked
                ? newValue.push(option.name)
                : newValue.splice(newValue.indexOf(option.name), 1);
              return input.onChange(newValue);
            }}
          />
        }
        label={option.name}
      />
    ));

  return <div>{switchGroup()}</div>;
};

export default SwitchGroup;
