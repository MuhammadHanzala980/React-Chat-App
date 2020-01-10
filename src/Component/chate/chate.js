import './style.css';
import { css } from 'glamor';
import firebase from 'firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Request from '../Request/request'
import ScrollToBottom from 'react-scroll-to-bottom';
import Friends from '../Friends/friends'
class Chate extends Component {
    constructor() {
        super()
        let cUser = JSON.parse(localStorage.getItem('userData'))
        this.state = {
            sms: '', resever: '', inbox: true, accounts: [], myMessage: [], friends: false, request: false, resevMessage: [], sender: cUser.id, currentUser: cUser
        }
    }

    componentDidMount() {
        const { sender } = this.state
        const obj = this.props.item
        if (obj !== 'user') {
            this.setState({ resever: obj });
            this.getMsg(obj)
        }

        let db = firebase.database().ref('/')
        db.child(`rooms/${sender}/startMessage/`).on('value', (user) => {
            let arr = []
            let data = user.val()
            for (let k in data) {
                if (data[k].userId !== this.state.sender) {
                    arr.push({ ...data[k], k })
                    this.setState({ accounts: arr, })
                }
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const obj = nextProps.item
        this.select(obj)
        console.log(nextProps.item.id, '>>>>>>>>>>>>>componentWillReceiveProps')
    }

    select(a) {
        this.setState({ resever: a, myMessage: [] })
        this.getMsg(a)
    }

    getMsg(resever) {
        let db = firebase.database().ref('/')
        const { sender } = this.state
        db.child(`rooms/${resever.userId}/messages/${sender}/`).on('value', (snap) => {
            let data = snap.val()
            let myMessageArr = []
            if (data !== null) {
                for (let k in data) {
                    myMessageArr.push({ ...data[k], k })
                    this.setState({
                        myMessage: myMessageArr
                    })
                }
            }
            else {
                this.setState({
                    myMessage: []
                })
            }
        })
    }

    send(ev) {
        ev.preventDefault()
        if (this.state.sms !== '') {
            let msgObj = {
                text: this.state.sms,
                sender: this.state.currentUser,
            }
            this.setState({ sms: '' })
            let db = firebase.database().ref('/')
            db.child(`rooms/${this.state.sender}/messages/${this.state.resever.userId}/`).push(msgObj)
            db.child(`rooms/${this.state.resever.userId}/messages/${this.state.sender}/`).push(msgObj)
        }
    }

    value(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { accounts, resever, sender, myMessage, sms, request, inbox, friends } = this.state
        const ROOT_CSS = css({ height: '63vh', marginBottom: 1, });
        return (
            <div className='chateRoom'>
                <div className='sideNav'>
                    <span title='Inbox' onClick={() => { this.setState({ request: false, inbox: true, friends: false }) }} ><i className="fab fa-facebook-messenger"></i></span>
                    <span title='Friends' onClick={() => { this.setState({ friends: true, inbox: false, request: false }) }} ><i className="fas fa-user-friends"></i></span>
                    <span title='Friend Request' onClick={() => { this.setState({ request: true, inbox: false, friends: false }) }} ><i className="fas fa-user-plus"></i></span>
                </div>

                <div className='friendList'>
                    {request && (<Request />)}
                    {friends && (<Friends />)}
                    {inbox && (
                        <div>
                            <div className='heading'>
                                <h2>Inbox</h2>
                            </div>
                            {accounts.map((v, i) => {
                                return (
                                    <div key={i} onClick={this.select.bind(this, v)} className='list' >
                                        <img alt='img' src="data:image/png;base64,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" />
                                        <p> {v.fName}</p>
                                    </div>
                                )
                            })}
                        </div>)}
                    <div>

                    </div>
                </div>


                <div className='messageList' >
                    <div className='messages'>
                        <h1>{resever.fName}</h1>
                        <div className='msgContener'>
                            <ScrollToBottom className={ROOT_CSS}>
                                {myMessage.map((v, i) => {
                                    if (v.sender.id === sender) { return (<div className='sendMsg' key={i}><div><p>{v.text}</p></div></div>) }
                                    else if (v.sender.id === resever.userId) { return (<div className='resevMsg' key={i}><div><p>{v.text}</p></div></div>) }
                                })}
                            </ScrollToBottom>
                        </div>
                    </div>
                    <div>
                        <form className='input' onSubmit={this.send.bind(this)} >
                            <input type='text' onChange={this.value.bind(this)} name='sms' value={sms} placeholder='Send' />
                            <button onClick={this.send.bind(this)}><i className="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.user
    }
}
export default connect(mapStateToProps)(Chate)