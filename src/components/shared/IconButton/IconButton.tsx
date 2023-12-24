import "./IconButton.scss";

interface IProps {
  icon: string;
  hint: string;
  enabled: () => boolean;
  onClick: () => void;
}

export function IconButton(props: IProps) {
  return (
    <button className={getClass()} onClick={handleClick} title={props.hint}>
      <i className={"fi " + props.icon}></i>
    </button>
  );

  function getClass() {
    const ret = "tc-IconButton ";
    if (props.enabled()) {
      return ret + "tc-IconButton-enabled";
    } else {
      return ret;
    }
  }

  function handleClick() {
    if (props.enabled()) {
      props.onClick();
    }
  }
}
