import { Box } from "./Box";
import { BsFillChatFill as ChatIcon } from "react-icons/bs";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { useUser } from "~/hooks/useUser";
import { BlockAvatar } from "./BlockAvatar";

export function Navigation() {
  const { user, logoutUser } = useUser();
  const router = useRouter();
  return (
    <Box as="nav" className="bg-white border-b">
      <div className="flex items-center justify-between max-w-screen-sm px-4 py-4 mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="font-bold">
            <ChatIcon size={24} />
          </h1>
          <p className="px-2 text-orange-900 bg-orange-200 border border-orange-300 rounded">
            Alpha
          </p>
        </div>
        {user?.isLoggedIn ? (
          <div className="flex items-center gap-4">
            <BlockAvatar className="rounded-full" seed={user.walletAddress} />
            <Button variant="secondary" onClick={() => logoutUser()}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => router.push("/api/login")}>
              Connect NFT
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
}
