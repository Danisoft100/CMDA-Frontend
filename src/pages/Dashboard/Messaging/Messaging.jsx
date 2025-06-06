import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ChatBox from "~/components/DashboardComponents/Messaging/ChatBox";
import ContactList from "~/components/DashboardComponents/Messaging/ContactList";
import SendNewMessage from "~/components/DashboardComponents/Messaging/SendNewMessage";

const DashboardMessagingPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("id");

  return (
    <div>
      <div className="flex justify-between gap-2 items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-primary">Messaging</h2>
        <SendNewMessage userId={user?._id} />
      </div>

      {/* large screen */}
      <section className=" gap-10 h-[calc(100vh-190px)] hidden lg:flex">
        {/* messages Lists */}
        <ContactList />

        {/* Chatbox */}
        {recipientId ? (
          <ChatBox userId={user._id} recipientId={recipientId} />
        ) : (
          <div className="w-3/5 flex flex-col justify-center items-center">
            <p className="font-bold text-lg text-center cursor-not-allowed">Select A User to start chatting with</p>
          </div>
        )}
      </section>

      {/* small screen  */}
      <section className=" gap-10 h-[calc(100vh-190px)] lg:hidden flex">
        {/* messages Lists */}
        {!recipientId && <ContactList userId={user?._id} />}

        {/* Chatbox */}
        {recipientId && <ChatBox userId={user._id} recipientId={recipientId} />}
      </section>
    </div>
  );
};

export default DashboardMessagingPage;
