import React from "react";
import CardList from "../components/CardList.js";
import SearchBox from '../components/SearchBox.js'
import Scroll from "../components/Scroll.js";
import ErrorBoundry from '../components/ErrorBoundry.js'
import './App.css'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: '',
        }
    }



    componentDidMount() {
        fetch('https://jsonplaceholder.cypress.io/users')
            .then(response => response.json())
            .then(users => { this.setState({ robots: users }) });
    }



    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if (!robots.length) {
            return <h1 className="tc">Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filterRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        };
    }
}


export default App;