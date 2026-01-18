export type Broker = {
  id: string;
  name: string;
  region: string;
  regulations: string[];
  minDeposit: number;
  spreadXAU: number; // USD / lot equivalent
  rebateXAU: number; // USD / lot
  netCostXAU: number; // computed
  strengths: string[];
  website: string;
};

export const brokers: Broker[] = [
  {
    id: "icmarkets",
    name: "IC Markets",
    region: "Global",
    regulations: ["ASIC", "CySEC"],
    minDeposit: 200,
    spreadXAU: 7.5,
    rebateXAU: 4.0,
    netCostXAU: 3.5,
    strengths: ["Low cost", "EA friendly"],
    website: "https://www.icmarkets.com/"
  },
  {
    id: "exness",
    name: "Exness",
    region: "Global",
    regulations: ["FSA", "CySEC"],
    minDeposit: 10,
    spreadXAU: 8.2,
    rebateXAU: 3.5,
    netCostXAU: 4.7,
    strengths: ["High leverage", "Crypto coverage"],
    website: "https://www.exness.com/"
  },
  {
    id: "xm",
    name: "XM",
    region: "Global",
    regulations: ["ASIC", "CySEC", "IFSC"],
    minDeposit: 5,
    spreadXAU: 9.0,
    rebateXAU: 3.0,
    netCostXAU: 6.0,
    strengths: ["Strong brand", "Bonus campaigns"],
    website: "https://www.xm.com/"
  },
  {
    id: "tmgm",
    name: "TMGM",
    region: "APAC",
    regulations: ["ASIC", "FMA"],
    minDeposit: 100,
    spreadXAU: 8.0,
    rebateXAU: 3.2,
    netCostXAU: 4.8,
    strengths: ["Execution", "Local support"],
    website: "https://www.tmgm.com/"
  }
];
