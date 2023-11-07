import { Col, Form, Input, Row } from 'antd';
import { ContractFactory } from 'ethers';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import useYupSchema from '@root/hooks/useYupSchema';
import { ModalBodyProps, NFTFormValues } from '@root/interfaces';
import { useEtherWalletStore } from '@root/services/store';

export default function NFTConstructorModalBody({
  closeModal,
  data,
  form,
  setIsLoading,
}: ModalBodyProps) {
  const { signer } = useEtherWalletStore();

  const { yupSync } = useYupSchema(
    Yup.object().shape({
      name: Yup.string().required('NFT Name is required'),
      symbol: Yup.string().required('Symbol is required'),
    })
  );

  const handleSubmit = async (values: NFTFormValues) => {
    try {
      setIsLoading(true);
      // Deploy smart contract with abi, bytecode
      const factory = new ContractFactory(data?.compiled.abi, data?.compiled.bytecode, signer);
      const newContract = await factory.deploy(values.name, values.symbol, data?.contract.nftURI);

      const result = await newContract.deploymentTransaction()?.wait();

      setIsLoading(false);
      closeModal();
      data?.handleOpenDeployResult({
        title: data?.contract?.title,
        hash: result?.blockHash || '',
        address: result?.contractAddress || '',
        contractId: data?.contract?.id,
      });
    } catch (error: any) {
      if (error.action === 'estimateGas') {
        toast.error('Insufficient balance');
      }
      setIsLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="contract-info-form"
      initialValues={{
        name: data?.contract?.title,
        symbol: 'MNFT',
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="name" label="NFT Name" rules={[yupSync]}>
            <Input placeholder="Enter Smart Contract Name" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="symbol" label="Symbol" rules={[yupSync]}>
            <Input placeholder="Enter Symbol" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
