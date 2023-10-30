import "ultimate-react-multilevel-menu/dist/esm/index.css";

import "./MainMenu.scss";

import {
  Nav,
  Collapse,
  Item,
  Items,
  Logo,
} from "ultimate-react-multilevel-menu";

export function MainMenu() {
  return (
    <div className="tc-MainMenu">
      <Nav className={"navbar-light bg-white"}>
        {/* <Logo href="/">Logo</Logo> */}
        <Collapse>
          <Items title="Файл">
            <Item>Создать</Item>
            <Item>Открыть</Item>
            <Item>Сохранить</Item>
          </Items>
          <Items title="Инфо">
            <Item>Открыть тестовый проект</Item>
            <Item>О программе</Item>
          </Items>
        </Collapse>
      </Nav>
    </div>
  );
}
