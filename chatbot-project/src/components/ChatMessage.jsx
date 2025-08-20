import RobotProfileImg from '../assets/robot.png'
import UserProfileImg from '../assets/user.png'

function ChatMessage({ message, sender }) {
  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImg} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImg} className="chat-message-profile" />
      )}
    </div>
  );
}

export default ChatMessage
