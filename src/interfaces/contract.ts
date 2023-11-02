import { Interface, InterfaceAbi } from 'ethers';

import { TypeContract } from '@root/constants';

export interface ContractInfo {
  ADDRESS: Record<number, string>;
  ABI: Interface | InterfaceAbi;
}

export interface ContractCompiled {
  _format: string;
  contractName: string;
  abi: Interface | InterfaceAbi;
  bytecode: string;
}

export type ContractCompiledList = Record<string, ContractCompiled>;

export interface ContractCardInfo {
  id: number;
  code: string;
  type?: string;
  image: string;
  title: string;
  description: string;
  price: number;
  deployersCount: number;
  nftURI?: string;
}

export interface ContractCardProps {
  info: ContractCardInfo;
  handleDeploy: (contract: ContractCardInfo) => void;
  isLoadingData: boolean;
}

export interface DeployContractResult {
  title: string;
  hash: string;
  address: string;
  contractId: number;
}

export interface NFTFormValues {
  name: string;
  symbol: string;
}

export interface ContractFormValues {
  message: string;
}

export interface GetContractListRes {
  contracts: ContractCardInfo[];
  countAll: number;
}

export interface CreateDeployerReq {
  address: string;
  blockHash: string;
  contractId: number;
}
