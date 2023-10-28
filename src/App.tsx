import './App.scss';
import { MainMenu } from './components/MainMenu/MainMenu';
import { ComponentsPalette } from './components/ComponentsPalette/ComponentsPalette';
import { DrawArea } from './components/DrawArea/DrawArea';

export function App() {
  return (
    <div className='tc-App'>
      <MainMenu></MainMenu>
      <div className="tc-App-edit-area">
        <ComponentsPalette></ComponentsPalette>
        <DrawArea></DrawArea>
      </div>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

