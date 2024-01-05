import "./IconButton.scss";

interface IProps {
  icon: string;
  hint: string;
  enabled: () => boolean;
  onClick?: (e: React.MouseEvent) => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerUp?: (e: React.PointerEvent) => void;
}

export function IconButton(props: IProps) {
  return (
    <button
      className={getClass()}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      title={props.hint}
    >
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

  function handleClick(e: React.MouseEvent) {
    if (props.enabled() && props.onClick) {
      props.onClick(e);
    }
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (props.enabled() && props.onPointerDown) {
      props.onPointerDown(e);
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (props.enabled() && props.onPointerUp) {
      props.onPointerUp(e);
    }
  }
}
