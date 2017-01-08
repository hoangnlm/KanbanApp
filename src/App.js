import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

/*
 let cardsList = [
 {
 id: 1,
 title: "<i>Read</i> the Book",
 description: "I should read the **whole** book",
 color: '#BD8D31',
 status: "in-progress",
 tasks: []
 },
 {
 id: 2,
 title: "<u>Write</u> some code",
 description: "Code along with the samples in the book at [github](https://github.com/pro-react)",
 color: '#3A7E28',
 status: "todo",
 tasks: [
 {
 id: 1,
 name: "ContactList Example",
 done: true
 },
 {
 id: 2,
 name: "Kanban Example",
 done: false
 },
 {
 id: 3,
 name: "My own experiments",
 done: false
 }
 ]
 },
 {
 id: 3,
 title: "<u>Download</u> the Book",
 description: "I have downloaded the  book",
 color: '#BD8D31',
 status: "done",
 tasks: []
 },
 {
 id: 4,
 title: "<sub>Download</sub> the Book",
 description: "I have downloaded the  book",
 color: '#3A7E28',
 status: "todo",
 tasks: []
 },
 {
 id: 5,
 title: "Test validate > 30 char",
 description: "I have downloaded the  book",
 color: '#3A7E28',
 status: "todo",
 tasks: []
 }
 ];
 */

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 id="App-title">Kanban Application - HoangNLM</h2>
                </div>
                <div className="App-intro">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;