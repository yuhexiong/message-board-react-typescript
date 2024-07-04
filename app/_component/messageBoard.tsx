import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import { deleteMessageApi, getMessageApi, postMessageApi } from '../_util/api';
import './messageBoard.scss';
import { MessageData } from '../_util/interface';
import { MessageList } from './message';

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [textAreaMessage, setTextAreaMessage] = useState<string>('');
  const [apiError, setApiError] = useState<string | null>(null);

  const getAndSetMessages = async () => {
    try {
      const data = await getMessageApi();
      setMessages(data);
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  useEffect(() => {
    getAndSetMessages();
  }, []);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaMessage(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textAreaMessage.trim()) {
      setApiError('should provide message');
      return;
    }

    try {
      await postMessageApi(textAreaMessage);
      await getAndSetMessages();
      setTextAreaMessage('');
      setApiError(null);
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await deleteMessageApi(id);
      await getAndSetMessages();
      setTextAreaMessage('');
      setApiError(null);
    } catch (error: any) {
      setApiError(error.message);
    }
  }

  return (
    <div className="page">
      <div className="page-title">
        <h1 className="title">留言板</h1>
      </div>
      <div className="page-body">
        <MessageList
            messages={messages}
            handleDeleteMessage={handleDeleteMessage}
          >
        </MessageList>
        <form className="message-form" onSubmit={handleFormSubmit}>
          <textarea className="message-text-area" value={textAreaMessage} onChange={handleTextAreaChange} rows={8}></textarea>
          <button className="submit-button" type="submit">送出</button>
        </form>
        {apiError && <div className="error-message">Error: {apiError}</div>}
      </div>
    </div>
  );
};

export default MessageBoard;
