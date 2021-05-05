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
    constructor(props) {
        super(props);
        this.state = {
            isOn: false,
            className: "inactive",
            background: 'gray'
        }
        this.changeState = this.changeState.bind(this);
    }
    changeState(color) {
        this.setState({
            background: color,
            isOn: !this.state.isOn,
            className: !this.state.isOn ? 'active' : 'inactive'
        });
    }
    render() {

        return (
            <div onClick={(e) => this.changeState(!this.state.isOn ? this.props.activeColor : this.props.passiveColor, e)} className={"radio-element " + this.state.className} style={{backgroundColor: this.state.background, borderColor: this.props.activeColor}}></div>
        );
    }
}
class ShopingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <ShopHeader name="Джуйк"></ShopHeader>
                <ShopElement ul={this.props.list}></ShopElement>
                <Radio passiveColor="#555555" activeColor="#55aa55"></Radio>
            </div>
        );
    }
}
class AnonimGreating extends React.Component {
    render() {
        return (
            <span>Аноним</span>
        );
    }
}
class UserGreating extends React.Component {
    render() {
        return (
            <span>Пользователь</span>
        );
    }
}
class Greating extends React.Component {
    render() {
        return (
            <p>Добрый день, {(() => { if (this.props.isLoggining) { return <UserGreating></UserGreating> } else { return <AnonimGreating></AnonimGreating> } })()}</p>
        )
    }
}
class LoginButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                Войти
            </button>
        );
    }
}
class LogoutButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                Выйти
            </button>
        )
    }
}
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggining: false };
    }
    handleLoginClick() {
        this.setState({ isLoggining: true });
    }
    handleLogoutClick() {
        this.setState({ isLoggining: false });
    }
    render() {
        const isLoggedIn = this.state.isLoggining;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />
        }
        else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }
        return (
            <div>
                <Greating isLoggining={isLoggedIn} />
                {button}
            </div>
        );
    }
}
class MailBox extends React.Component {
    render() {
        const unreadMessages = this.props.unreadMessages;
        return (
            <div>
                <h1>Здравия, товарищ!</h1>
                {unreadMessages.length > 0 && //Условный оператор в JSX, элемент после && будет выведен, если условие верно, в противном случае ничего не будет выведено
                    <h2> {/*Можно использовать стандартный тернарный оператор JS знак вопроса*/}
                        Твой почтовый ящик содержит { unreadMessages.length } непрочитанных сообщений!
                    </h2>
                }
            </div>
        );
    }
}
const unreadMessages = ['React', 'Not React', 'Absolutely React', 'IDK', 'Maybe React'];
class WarningBanner extends React.Component {
    render() {
        if (!this.props.warn) {
            return null;
        }
        return (
            <div className="warning">
                Предупреждение
            </div>
        );
    }
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWarning: true };
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    handleToggleClick() {
        this.setState((state) => ({showWarning: !state.showWarning}));
    }
    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Спрятать' : 'Показать'}
                </button>
            </div>
        )
    }
}
class Increaser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: [1, 2, 3, 4, 5] };
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleTripleClick = this.handleTripleClick.bind(this);
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.handleSqrtClick = this.handleSqrtClick.bind(this);
    }
    handleDoubleClick() {
        this.setState((state) => ({ values: state.values.map((value) => value*2)}));
    }
    handleTripleClick() {
        this.setState((state) => ({ values: state.values.map((value) => value*3)}));
    }
    handleSquareClick() {
        this.setState((state) => ({ values: state.values.map((value) => value*value)}));
    }
    handleSqrtClick() {
        this.setState((state) => ({ values: state.values.map((value) => Math.ceil(Math.sqrt(value)))}));
    }
    render() {
        const list = this.state.values.map((value, index) => <li key={ index }>{ value }</li>);
        return (
            <div>
                <ul>{ list }</ul>
                <button onClick={this.handleDoubleClick}>Увеличить в 2 раза</button> 
                <button onClick={this.handleTripleClick}>Увеличить в 3 раза</button> 
                <button onClick={this.handleSquareClick}>Возвести в квадрат</button> 
                <button onClick={this.handleSqrtClick}>Взять целочисленный корень</button>
            </div>
          
        );
    }
}
class PasswordField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', length: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value, length: event.target.value.length });
    }
    handleSubmit(event) {
        alert('Не сообщай пароль ' + this.state.value + ' товарищам!');
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Пароль: 
                    <input value={this.state.value} onChange={this.handleChange} /><br/>
                </label>
                {this.state.length < 16 &&
                    <b><i>Товарищ, пароль должен быть длиннее 16 символов!<br/></i></b>
                }
                <button type="submit">Отправить</button>
            </form>
        );
    }

}
class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ['red', 'yellow']};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: this.state.value + [event.target.value]});
        console.log(this.state.value);
    }
    render() {
        return (
            <select value={this.state.value} multiple={true} onChange={this.handleChange}>
                <option value="red">Красный</option>
                <option value="blue">Синий</option>
                <option value="yellow">Жёлтый</option>
                <option value="green">Зелёный</option>
                <option value="black">Чёрный</option>
                <option value="white">Белый</option>
            </select>
        );
    }
}
class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <ShopingList name="Джейк" list="Это просто список продуктов или не продуктов :)"></ShopingList>
                <LoginControl />
                <MailBox unreadMessages={unreadMessages}></MailBox>
                <Page />
                <Increaser />
                <PasswordField />
                <Select />
            </div>
        )
    }
}
ReactDOM.render(
    <Main></Main>,
    document.getElementById('root')
);