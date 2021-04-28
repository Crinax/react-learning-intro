import { ReactComponent } from '*.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './general.css';

class ShopHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            date: new Date()
        };
        this.headerClick = this.headerClick.bind(this);
    }
    headerClick() {
        alert(this.state.date);
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date(),
            isToogleOn: !this.state.isToogleOn
        })
    }
    render() {
        return (
            <h1 onClick={this.headerClick}>Список покупок для {this.props.name} от {this.state.date.toLocaleTimeString()} {this.state.isToogleOn ? "On" : "Off"}</h1>
        )
    }
}
class ShopElement extends React.Component {
    render() {
        return (
            <ul>{this.props.ul.split(' ').map((elem, index) => <li key={index}>{elem}</li>)}</ul>
        );
    }
}
class Radio extends React.Component {
    render() {
        return (

        )
    }
}
class ShopingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <ShopHeader name="Джуйк"></ShopHeader>
                <ShopElement ul={this.props.list}></ShopElement>
                <Radio passiveColor="gray" activeColor="green"></Radio>
            </div>
        );
    }
}
function tick() {
    

    ReactDOM.render(
        <ShopingList name="Джейк" list="Это просто список продуктов или не продуктов :)"></ShopingList>,
        document.getElementById('root')
    );
}
setInterval(tick, 1000)