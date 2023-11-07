import { Col, Form, Input, Row, Typography } from 'antd';
import { ContractFactory } from 'ethers';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import useYupSchema from '@root/hooks/useYupSchema';
import { ContractFormValues, ModalBodyProps } from '@root/interfaces';
import { useEtherWalletStore } from '@root/services/store';

export default function ContractConstructorModalBody({
  closeModal,
  data,
  form,
  setIsLoading,
}: ModalBodyProps) {
  const { signer } = useEtherWalletStore();
  const { yupSync } = useYupSchema(
    Yup.object().shape({
      message: Yup.string().required('Hello Message is required'),
    })
  );

  const handleSubmit = async (values: ContractFormValues) => {
    try {
      setIsLoading(true);
      // Deploy smart contract with abi, bytecode
      const factory = new ContractFactory(data?.compiled.abi, data?.compiled.bytecode, signer);
      const newContract = await factory.deploy(values.message);

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
        message: 'Hello Scroll',
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="message" label="Hello Message" rules={[yupSync]}>
            <Input placeholder="Enter Hello Message" />
          </Form.Item>
          <Typography className="text-sm italic text-gray-500">
            Message will be stored on smart contracts. You can enter anything you want
          </Typography>
        </Col>
      </Row>
    </Form>
  );
}
