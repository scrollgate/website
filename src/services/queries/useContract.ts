import { useQuery, useMutation } from '@tanstack/react-query';

import { QueryKeys } from '@root/constants';
import { ContractCardInfo, CreateDeployerReq } from '@root/interfaces';

import { ContractAPI } from '../apis';

export const useGetContractList = () => {
  return useQuery([QueryKeys.CONTRACT_LIST], ContractAPI.getContractList, {
    initialData: {
      data: {
        contracts: Array(4).fill({
          code: '',
          title: '',
          description: '',
          image: '',
          price: 0,
          deployersCount: 0,
        } as ContractCardInfo),
        countAll: 0,
      },
      currentTime: '',
      msg: '',
      status: 0,
    },
  });
};

export const useCreateDeployer = () => {
  return useMutation({
    mutationFn: (body: CreateDeployerReq) => ContractAPI.createDeployer(body),
  });
};
