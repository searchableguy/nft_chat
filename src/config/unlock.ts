export const networks: Record<
  string,
  {
    unlockAddress: string;
    provider: string;
  }
> = {
  "4": {
    unlockAddress: "0xd8c88be5e8eb88e38e6ff5ce186d764676012b0b", // Smart contracts docs include all addresses on all networks
    provider: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
};

export const paywallConfig: Record<string, unknown> = {
  locks: {
    "0xAFb18afe27606acCe6084482022274ede8C8bbA9": {
      network: 4,
    },
  },
  pessimistic: true,
};
