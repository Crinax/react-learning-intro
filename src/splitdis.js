import React from 'react';

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.generateMessage = this.generateMessage.bind(this);
    }
    componentDidMount() {
        this.timerID = setInterval(this.generateMessage, randomInt(100, 5000));
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    generateMessage() {
        var alphabet = `
            абвгдеёжзийклмнопрстуфхцчшщъыьэюя
            АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ
        `;
        var message = '';
        for (let i = 0; i < randomInt(50, 250); i++) {
            message += alphabet[randomInt(0, alphabet.length-1)];
        }
        var result = this.state.messages;
        result.push(message);
        this.setState({ messages: result});
    }
    render() {
        console.log(Array.isArray(this.state.messages));
        var messages = this.state.messages;
        console.log(messages, Array.isArray(messages));
        messages = messages.map((val, index) => {
            return (
                <div id="chat-card" key={index}>
                    <div id="username">
                        <p id="username-text"><b><i>Пользователь #{index}</i></b></p>
                    </div>
                    <div id="usermessage">
                        <p ud="usermessage-text">{val}</p>
                    </div>
                </div>
            );
        });
        return (
            <div id="chat">
                {messages}
            </div>
        );
    }
}
class Info extends React.Component {
    render() {
        return (
            <div id="info">
                <h3>Это просто чат 🙃</h3>
            </div>
        );
    }
}
class SplitDis extends React.Component {
    render() {
        console.log(this.props.children);
        return (
            <div className="split-section">
                <div className="split-section__left">{ this.props.children[0] }</div>
                <div className="split-section__right">{ this.props.children[1] }</div>
            </div>
        );
    }
}
export { SplitDis, Chat, Info };