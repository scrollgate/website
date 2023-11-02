import { CreateDeployerReq, GetContractListRes } from '@root/interfaces';
import { httpService } from '@services';

class API {
  async getContractList() {
    return httpService.get<GetContractListRes>(`/contracts`);
  }

  async createDeployer(body: CreateDeployerReq) {
    return httpService.post(`/deployers`, { body });
  }
}

export const ContractAPI = new API();
