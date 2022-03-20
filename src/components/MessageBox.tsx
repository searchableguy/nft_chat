import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUser } from "~/hooks/useUser";
import { Message } from "~/models";
import { fetchJson } from "~/utils";
import { Button } from "./Button";

export function MessageBox() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();

  async function onSubmit({ content }: any) {
    if (!user?.isLoggedIn) {
      return;
    }
    const message: z.infer<typeof Message> = {
      key_id: `${user.memberships![0].lockAddress}-${user.memberships![0].id}`,
      wallet_address: user.walletAddress!,
      content,
    };

    const result = await fetchJson("/api/send-message", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });

    console.info(result);

    reset();
  }

  return (
    <form className="grid py-4 space-y-1" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        required
        {...register("content", {
          required: true,
          disabled: !user?.isLoggedIn,
        })}
        placeholder={
          user?.isLoggedIn
            ? "Type your message here"
            : "Please login to send messages"
        }
        className="w-full rounded disabled:bg-slate-100 border-slate-200"
      />
      <Button disabled={!user?.isLoggedIn} type="submit">
        Send message
      </Button>
    </form>
  );
}
