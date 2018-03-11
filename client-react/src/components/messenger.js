import React, { Component } from 'react';
import classNames from 'classnames';

import '../css/app.css';
import avatar from '../assets/imgs/avatar.png';

export default class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      messages: []
    };

    this._onResize = this._onResize.bind(this);
    this.addTestMessages = this.addTestMessages.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    this.addTestMessages();
  }

  componentWillMount() {
    window.removeEventListener('resize', this._onResize);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight
    });
  }

  addTestMessages() {
    let { messages } = this.state;

    for (let i = 0; i < 100; i++) {
      let isMe = false;
      if (i % 3 === 0) {
        isMe = true;
      }
      const newMsg = {
        author: `Author: ${i}`,
        body: `The body of message ${i}`,
        avatar: avatar,
        me: isMe
      };

      messages.push(newMsg);
    }

    this.setState({ messages: messages });
  }

  render() {
    const { height, messages } = this.state;
    const style = {
      height: height
    };
    return (
      <div style={style} className="app-messenger">
        {/* header */}
        <div className="header">
          <div className="left">
            <div className="actions">
              <button>New Message</button>
            </div>
          </div>

          <div className="content">
            <h2>Title</h2>
          </div>
          <div className="right">
            <div className="user-bar">
              <div className="profile-name">Kara Gurley</div>
              <div className="profile-image">
                <img src={avatar} alt="Avatar" />
              </div>
            </div>
          </div>
        </div>
        {/* end of header */}

        {/* main */}
        <div className="main">
          <div className="sidebar-left">
            <div className="channels">
              <div className="channel">
                <div className="user-image">
                  <img src={avatar} alt="user" />
                </div>
                <div className="channel-info">
                  <h2>Kara, Johnathan</h2>
                  <p>Hello there</p>
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="content">
            <div className="messages">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={classNames('message', { me: message.me })}
                  >
                    <div className="message-user-image">
                      <img src={message.avatar} alt="user" />
                    </div>
                    <div className="message-body">
                      <div className="message-author">
                        {message.me ? 'You ' : message.author} says:
                      </div>
                      <div className="message-text">
                        <p>{message.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="messenger-input">
              <div className="text-input">
                <textarea placeholder="Write your message here ..." />
              </div>
              <div className="actions">
                <button className="send">Send</button>
              </div>
            </div>
          </div>
          {/* end of content */}
          <div className="sidebar-right">
            <h2 className="title">Memebers</h2>
            <div className="members">
              <div className="member">
                <div className="user-image">
                  <img src={avatar} alt="user" />
                </div>
                <div className="member-info">
                  <h2>Kara Gurley</h2>
                  <p>Joined : 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of main */}
      </div>
    );
  }
}
