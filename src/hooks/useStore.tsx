import { useEffect, useState } from "react";
import { useSupabase } from "use-supabase";

interface Props {}

export const useStore = ({}: Props) => {
  const supabase = useSupabase();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const messageListener = supabase
      .from("messages")
      .on("INSERT", (payload) => {
        setMessages(messages.concat(payload.new));
      })
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, [messages, supabase]);

  useEffect(() => {
    async function fetchMessages(
      channel: string,
      setState: (state: any) => unknown
    ) {
      try {
        const { body } = await supabase
          .from("messages")
          .select("*")
          .eq("channel", channel)
          .order("created_at");
        setState(body!);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessages("main", setMessages);
  }, [supabase]);

  return {
    messages,
  };
};
