import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "~/config/session";
import { supabase } from "~/config/supabase.server";
import * as z from "zod";
import { Message } from "~/models";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<string | z.infer<typeof Message> | null>
) {
  try {
    if (req.session.user?.isLoggedIn) {
      const message = await Message.parseAsync(req.body);
      const result = await supabase.from("messages").insert(message).then();
      res.json(result.data![0] as z.infer<typeof Message>);
    } else {
      res
        .status(401)
        .send("Cannot send message due to insufficient persmission");
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
}
