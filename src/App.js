import { Component } from 'react';
import SearchBox from './components/search-box/Search-box.component';
import CardList from './components/Card-list/Card-list.component';
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField:''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => 
        this.setState({
          monsters: users
        }, () => {
          console.log(this.state);
        })
      ); 
  }
  onSearchChange=(event) => {
    const searchField=event.target.value.toLocaleLowerCase();
    this.setState(()=>{
      return {searchField};
    });
  };
  render() {
    const {monsters,searchField} = this.state;
    const {onSearchChange} = this;

    const filteredMonsters =monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });
    return (
      <div className="App">
        <h1 className='app-title'>Rulez Rolodex</h1>
         <SearchBox onChangeHandler={onSearchChange} placeholder='search monster'/>
         <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;

