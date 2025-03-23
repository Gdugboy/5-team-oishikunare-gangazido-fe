import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: '안녕하세요! 반려견에 관한 질문이 있으신가요?', isUser: false, time: '오전 10:30' },
    { id: 2, text: '우리 강아지가 밥을 잘 안 먹어요. 어떻게 해야 할까요?', isUser: true, time: '오전 10:31' },
    { id: 3, text: '강아지가 밥을 잘 안 먹는 이유는 여러 가지가 있을 수 있어요. 식사 환경이 불편하거나, 음식이 마음에 들지 않거나, 건강 문제가 있을 수 있습니다. 먼저 평소와 다른 행동이 있는지 관찰해보시고, 지속된다면 수의사와 상담하는 것이 좋습니다.', isUser: false, time: '오전 10:32' }
  ]);

  const [suggestedQuestions] = useState([
    '강아지 산책 시간은 얼마나 되어야 할까요?',
    '강아지 목욕은 얼마나 자주 시켜야 하나요?',
    '강아지가 자꾸 짖어요. 어떻게 해야 할까요?',
    '강아지 사료 선택 시 중요한 점은 무엇인가요?'
  ]);

  const goToMap = () => {
    navigate('/map');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToPetInfo = () => {
    navigate('/pets');
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // 사용자 메시지 추가
    const newUserMessage = {
      id: chatMessages.length + 1,
      text: message,
      isUser: true,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newUserMessage]);
    setMessage('');

    // AI 응답 시뮬레이션 (실제로는 API 호출 등이 필요)
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        text: '죄송합니다만, 현재 이 기능은 데모 버전이라 실제 응답을 제공하지 못합니다. 실제 서비스에서는 반려견 관련 질문에 대한 답변을 제공할 예정입니다.',
        isUser: false,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question) => {
    setMessage(question);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">반려견 상담</h1>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </header>

      {/* 채팅 영역 */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3/4 rounded-lg p-3 ${msg.isUser ? 'bg-amber-800 text-white' : 'bg-white shadow-md'}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 text-right ${msg.isUser ? 'text-amber-100' : 'text-gray-500'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 질문 */}
      <div className="bg-white p-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">추천 질문</p>
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="whitespace-nowrap px-3 py-2 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-amber-100 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* 메시지 입력 */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-amber-800 text-white rounded-r-md hover:bg-amber-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-between px-2">
          <button onClick={goToMap} className="flex flex-col items-center py-3 flex-1 text-gray-500 hover:text-amber-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1 font-medium">지도</span>
          </button>
          <button className="flex flex-col items-center py-3 flex-1 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-xs mt-1 font-medium">채팅</span>
          </button>
          <button onClick={goToProfile} className="flex flex-col items-center py-3 flex-1 text-gray-500 hover:text-amber-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1 font-medium">내 정보</span>
          </button>
          <button onClick={goToPetInfo} className="flex flex-col items-center py-3 flex-1 text-gray-500 hover:text-amber-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s-6-4.35-9-8c-3-3.35-3-7.35 0-10 3-3 7.5-2 9 2 1.5-4 6-5 9-2 3 3 3 7 0 10-3 3.65-9 8-9 8z" />
            </svg>
            <span className="text-xs mt-1 font-medium">반려견 정보</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default ChatPage; 