import { Box } from "~/components/Box";
import * as blockies from "blockies-ts";
import { twMerge } from "tailwind-merge";

interface Props {
  seed: string;
  className?: string;
}

export function BlockAvatar({ className, seed }: Props) {
  const imgSrc = blockies
    .create({
      seed,
    })
    .toDataURL();
  return <Box src={imgSrc} className={twMerge("", className)} as="img"></Box>;
}
