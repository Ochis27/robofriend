import React, { useState, useEffect } from "react";
import CardList from "../components/CardList.js";
import SearchBox from '../components/SearchBox.js'
import Scroll from "../components/Scroll.js";
import ErrorBoundry from '../components/ErrorBoundry.js'
import './App.css'

function App() {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchField] = useState('');


    useEffect(() => {
        fetch('https://jsonplaceholder.cypress.io/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
    }, [])

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    }

    let filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    if (!robots.length) {
        return <h1 className="tc">Loading</h1>
    } else {
        return (
            <div className="tc">
                <h1 className="f2">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    };
}



export default App;