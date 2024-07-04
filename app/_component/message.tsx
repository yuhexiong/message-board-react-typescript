import { Delete } from "@mui/icons-material";
import { MessageData } from "../_util/interface";
import { ReactNode } from "react";
import './messageBoard.scss';

type MessageProps = {
  author: string;
  time: string;
  children: ReactNode;
  message: MessageData;
  handleDeleteMessage: (id: number) => Promise<void>
};

const Message: React.FC<MessageProps> = ({ author, time, children, message, handleDeleteMessage }) => (
  <div className="message-container">
    <div className="message-head">
      <div className="message-author">{author}</div>
      <div className="message-time">{time}</div>
      <div className="delete-div">
        <button className="delete-button" type="button" onClick={() => {handleDeleteMessage(message.id)}}>
          <Delete className="delete-icon" />
        </button>
      </div>
    </div>
    <div className="message-body">{children}</div>
  </div>
);

type MessageListProps = {
  messages: MessageData[];
  handleDeleteMessage: (id: number) => Promise<void>
};

export const MessageList: React.FC<MessageListProps> = ({ messages, handleDeleteMessage }) => (
  <div className="message-list">
    {messages.map((message) => (
      <Message
        key={message.id} 
        author={message.name} 
        time={new Date(message.createdAt).toLocaleString()}
        handleDeleteMessage={handleDeleteMessage}
        message={message}
      >
        {message.message}
      </Message>
    ))}
  </div>
);