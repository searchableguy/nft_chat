import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { Button } from "~/components/Button";
import { useUser } from "~/hooks/useUser";
import { MembershipMetadata } from "~/types";
import { BsFillChatFill as ChatIcon } from "react-icons/bs";
import { useRouter } from "next/router";
import { Navigation } from "~/components/Navigation";
import { MessageBox } from "~/components/MessageBox";
import { useSupabase } from "use-supabase";
import { useStore } from "~/hooks/useStore";
import { useEffect, useRef } from "react";
import { BlockAvatar } from "~/components/BlockAvatar";

const Home: NextPage = () => {
  const { messages } = useStore({});
  const containerRef = useRef<any>(null);
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, []);
  return (
    <div>
      <Navigation />
      <div className="max-w-screen-sm px-4 pt-8 mx-auto">
        <header className="space-y-1 text-center">
          <h1 className="text-xl font-bold sm:text-3xl">NFT Membership Chat</h1>
          <p className="text-base sm:text-lg">
            A chat box where people who own chat membership NFTs can write
            messages and interact with each other. Non-members can read the
            chat.
          </p>
        </header>
        <div className="py-8">
          <div className="h-[600px] border rounded-lg">
            <div className="flex w-full gap-2 p-2 rounded-t-lg bg-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-500 rounded-full"></div>
                <div className="p-2 bg-orange-300 rounded-full"></div>
                <div className="p-2 bg-green-400 rounded-full"></div>
              </div>
              <p className="px-4 font-bold rounded bg-slate-300">#main</p>
            </div>
            <div className="flex flex-col justify-between flex-auto h-full">
              <div
                ref={containerRef}
                className="grid gap-2 p-2 overflow-y-auto"
              >
                {messages
                  .slice(messages.length - 25, messages.length)
                  .map(({ wallet_address, content, id }) => (
                    <div
                      key={id}
                      className="flex items-center gap-2 p-2 break-words bg-gray-100 rounded"
                    >
                      <BlockAvatar
                        className="rounded-full"
                        seed={wallet_address}
                      />
                      <p>{content}</p>
                    </div>
                  ))}
              </div>
              <div>
                <MessageBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
