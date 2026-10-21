"use client";

import { useEffect, Fragment, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { formatChatDate, isSameDay } from "@/lib/utils";


function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser || !authUser) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatHeader />
      <div className="flex-1 px-3 sm:px-6 overflow-y-auto py-4 sm:py-6">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, index) => {
              // 1. DETERMINE IF WE NEED A DIVIDER
              const isFirst = index === 0;
              const isNewDay = !isFirst && !isSameDay(msg.createdAt, messages[index - 1].createdAt);
              const showDateDivider = isFirst || isNewDay;

              return (
                <Fragment key={msg._id}>
                  {/* 2. THE DATE DIVIDER */}
                  {showDateDivider && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 shadow-sm backdrop-blur-sm">
                        {formatChatDate(msg.createdAt)}
                      </span>
                    </div>
                  )}

                  {/* 3. YOUR EXISTING CHAT BUBBLE (UNCHANGED) */}
                  <div
                    className={`chat ${
                      msg.senderId === authUser._id ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div
                      className={`chat-bubble relative ${
                        msg.senderId === authUser._id
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover mb-2"
                      />
                    )}
                    {msg.text && <p>{msg.text}</p>}
                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </Fragment>
              );
            })}
            <div ref={messageEndRef} />
          </div>

        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
