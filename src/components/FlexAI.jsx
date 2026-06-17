import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Trash2 } from 'lucide-react';
import './FlexAI.css';

const FlexAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hi there! I'm Flex AI. I can recommend activities, explain their benefits, or give general fitness and recovery advice. How can I help today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleClearChat = () => {
    setMessages([
      { id: Date.now(), sender: 'ai', text: "Chat cleared! How can I help you today?" }
    ]);
  };

  const generateAIResponse = (userMessage) => {
    const text = userMessage.toLowerCase();
    let response = "I'm sorry, I'm specifically trained to help you with fitness recommendations, workout benefits, injury recovery, and health condition advice. I cannot answer queries outside of this scope.";

    // 1. Greetings
    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      response = "Hello! Ready to crush your fitness goals? Tell me what you're looking to achieve or if you need a recommendation.";
    }
    
    // 2. Recommendations & Benefits based on past interests (simulated context)
    else if (text.includes("recommend") || text.includes("suggest") || text.includes("what should i do")) {
      response = "Based on your recent interest in Strength Training and Swimming, I highly recommend trying **Pilates**. It's excellent for core stability, improves flexibility, and perfectly balances out heavy lifting by strengthening your stabilizer muscles without overtaxing your joints.";
    }
    else if (text.includes("benefit") && (text.includes("zumba") || text.includes("dance"))) {
      response = "Zumba is fantastic! It's a full-body cardio workout that burns a high amount of calories, improves cardiovascular health, and boosts your mood by triggering endorphin release through rhythmic movement.";
    }
    else if (text.includes("benefit") && text.includes("mma")) {
      response = "MMA provides unparalleled functional fitness. It drastically improves your agility, cardiovascular endurance, and explosive power while also teaching valuable self-defense skills.";
    }

    // 3. Injury Treatment (R.I.C.E or general advice)
    else if (text.includes("injury") || text.includes("sprain") || text.includes("pain") || text.includes("hurt") || text.includes("treat")) {
      response = "For acute injuries like sprains or strains, remember the R.I.C.E. method:\n1. Rest the injured area.\n2. Ice it for 15-20 mins every few hours.\n3. Compress with a bandage.\n4. Elevate the injury above your heart.\n*Note: Please consult a physical therapist or doctor if the pain persists or is severe.*";
    }

    // 4. Disease / Health condition limitations
    else if (text.includes("asthma") || text.includes("breathing")) {
      response = "If you have asthma, it's best to avoid prolonged, high-intensity cardio in cold or dry environments. Instead, opt for Swimming (the warm, humid air helps keep airways open), Yoga, or moderate-paced strength training. Always keep your inhaler nearby!";
    }
    else if (text.includes("heart") || text.includes("hypertension") || text.includes("blood pressure")) {
      response = "With a heart condition, avoid sudden, extreme intensity spikes like heavy powerlifting (which spikes blood pressure) or extreme HIIT. Focus on steady-state cardio like walking, cycling, or swimming, and always get clearance from your cardiologist first.";
    }
    else if (text.includes("knee") || text.includes("arthritis") || text.includes("joint")) {
      response = "For knee pain or arthritis, avoid high-impact activities like running on concrete, jumping rope, or heavy squats. Excellent low-impact alternatives are Swimming, Cycling, and Pilates.";
    }

    // 5. Out of scope edge cases specifically handled
    else if (text.includes("capital") || text.includes("math") || text.includes("code") || text.includes("president") || text.includes("movie")) {
      // Uses default response
    }

    return response;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate network delay for AI thought process
    setTimeout(() => {
      const replyText = generateAIResponse(newUserMessage.text);
      const aiResponse = { id: Date.now() + 1, sender: 'ai', text: replyText };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex-ai-container">
      {!isOpen && (
        <button className="flex-ai-fab pulse-glow" onClick={() => setIsOpen(true)}>
          <Sparkles size={28} />
        </button>
      )}

      {isOpen && (
        <div className="flex-ai-chat-window">
          <div className="chat-header">
            <h3><Bot size={20} color="var(--primary-color)"/> <span>Flex AI</span></h3>
            <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
              <button className="close-btn" onClick={handleClearChat} title="Clear Chat">
                <Trash2 size={16} />
              </button>
              <button className="close-btn" onClick={() => setIsOpen(false)} title="Close">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message ai">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask for fitness advice..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FlexAI;
