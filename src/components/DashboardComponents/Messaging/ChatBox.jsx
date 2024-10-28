import { useEffect, useRef, useState } from "react";
import icons from "~/assets/js/icons";
import { useNavigate } from "react-router-dom";
import { classNames } from "~/utilities/classNames";
import ContactListItem from "./ContactListItem";
import { useGetAllContactsQuery, useGetChatHistoryQuery } from "~/redux/api/chats/chatsApi";
import { useGetSingleUserQuery } from "~/redux/api/user/userApi";
import Loading from "~/components/Global/Loading/Loading";
import Message from "./Message";
import { useSocket } from "~/utilities/socket";

const ChatBox = ({ userId, recipientId }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputHeight, setInputHeight] = useState(48); // Initial height
  const navigate = useNavigate();
  const maxInputHeight = 160;

  const {
    data: allChatsBetweenUsers,
    isLoading,
    isFetching,
  } = useGetChatHistoryQuery(recipientId, { refetchOnMountOrArgChange: true });
  const { data: recipientData, isLoading: loadingRecipientData } = useGetSingleUserQuery(recipientId, {
    skip: recipientId === "admin",
  });
  // eslint-disable-next-line no-unused-vars
  const { data } = useGetAllContactsQuery(null, { refetchOnMountOrArgChange: true });

  const [allMessages, setAllMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputHeight(e.target.scrollHeight);
    if (inputHeight > maxInputHeight) {
      setInputHeight(maxInputHeight);
    }
  };

  const { socket } = useSocket();

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("newMessage", { sender: userId, receiver: recipientId, content: inputValue });
    setInputValue("");
  };

  useEffect(() => {
    if (allChatsBetweenUsers) {
      setAllMessages(allChatsBetweenUsers);
    }
  }, [allChatsBetweenUsers]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      setAllMessages((prev) => [...prev, newMessage]);
    };

    const eventName = `newMessage_${[userId, recipientId].sort().join("_")}`;

    socket.on(eventName, handleNewMessage);

    return () => {
      socket.off(eventName, handleNewMessage);
    };
  }, [socket, recipientId, userId]);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <div className="w-full lg:w-3/5 flex flex-col rounded-xl">
      {/* back button mobile screen */}
      <div className="lg:hidden">
        <div
          className="flex items-center text-black gap-x-2 mt-1 mb-4 cursor-pointer"
          onClick={() => navigate("/dashboard/messaging")}
        >
          <span className="text-lg">{icons.arrowLeft}</span> <span>Back</span>
        </div>
      </div>

      <div className="bg-white shadow rounded-t-xl max-md:pt-4">
        {loadingRecipientData ? (
          <div className="flex justify-center items-center w-full h-full">
            <Loading />
          </div>
        ) : (
          <ContactListItem
            asHeader={true}
            name={recipientId === "admin" ? "Admin" : recipientData?.fullName}
            image={recipientId === "admin" ? null : recipientData?.avatarUrl}
            subText={recipientId === "admin" ? "CMDA Nigeria" : recipientData?.email}
          />
        )}
      </div>
      <div className="w-full bg-onPrimary h-[calc(100vh-400px)] md:h-[calc(100vh-320px)]">
        {isLoading || isFetching ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading className="text-primary h-16 w-16" />
          </div>
        ) : (
          <div className="w-full h-full overflow-y-auto flex flex-col">
            {allMessages.map(
              (item) =>
                item.content && (
                  <Message
                    key={item._id}
                    content={item.content}
                    timestamp={item.updatedAt}
                    isSender={item.sender === userId}
                  />
                )
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </div>
      <div className="bg-white rounded-b-xl p-4 shadow">
        <form onSubmit={handleSend} className="flex gap-4">
          <textarea
            className={classNames(
              "bg-white border border-gray placeholder:text-[gray] rounded-lg block w-full text-sm p-3",
              "focus:ring focus:ring-primary/25 focus:outline-none focus:bg-white focus:border-transparent transition-all",
              inputHeight >= maxInputHeight && "overflow-auto"
            )}
            style={{ height: `${inputHeight}px` }}
            placeholder="Your message..."
            onChange={handleInputChange}
            value={inputValue}
            required
          />
          <button
            type="submit"
            className={classNames(
              "bg-primary text-white hover:bg-primaryContainer h-12 w-12 p-4 rounded-full shadow-lg",
              "inline-flex justify-center items-center text-2xl cursor-pointer",
              "focus:ring focus:ring-primary/25 focus:outline-none focus:border-transparent transition-all"
            )}
          >
            {icons.send}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
