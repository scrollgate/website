import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import { useWallets } from '@web3-onboard/react';
import { Col, Divider, Row, Statistic, Steps, Typography } from 'antd';
import dayjs from 'dayjs';
import { ContractFactory } from 'ethers';
import { useInView } from 'framer-motion';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import CountUp from 'react-countup';

import guide from '@assets/images/guide.png';
import introduce from '@assets/images/introduce.png';
import jsonData from '@contracts/contracts-compile.json';
import { TypeContract } from '@root/constants';
import { useModal } from '@root/hooks';
import { ContractCardInfo, ContractCompiledList, DeployContractResult } from '@root/interfaces';
import { useCreateDeployer, useGetContractList } from '@root/services/queries/useContract';
import { useEtherWalletStore } from '@root/services/store';

import ContractCard from './components/contract-card/ContractCard';
import ContractConstructorModalBody from './components/contract-constructor-modal/ContractConstructorModal';
import DeployResultModalBody from './components/deploy-result-modal/DeployResultModalBody';
import NFTConstructorModalBody from './components/nft-constructor-modal/NFTConstructorModalBody';
import { TimerCountdown } from './components/timer-count-down/TimerCountdown';
import './deploy.scss';

const formatter = (value: number | string) => <CountUp end={+value} separator="," />;
const renderer = ({ hours, minutes, seconds, days }: CountdownRenderProps) => {
  return <TimerCountdown hours={hours} days={days} seconds={seconds} minutes={minutes} />;
};

const STEPS = [
  {
    title: <Typography className="text-xl font-semibold">Choose Smart Contract</Typography>,
    description: (
      <Typography className="text-lg font-medium">
        Just choose the smart contract you want to deploy then click on
        <span className="font-bold mx-1 italic">Deploy Smart Contract Now</span>and fill in some
        necessary information.
      </Typography>
    ),
  },
  {
    title: <Typography className="text-xl font-semibold">Automation Deploy</Typography>,
    description: (
      <Typography className="text-lg font-medium">
        <span className="font-bold">ScrollGate</span> will automatically deploy the smart contract
        and notify when it is successful.
      </Typography>
    ),
  },
];

export default function DeployPage() {
  const compiledList = useRef<ContractCompiledList>(jsonData).current;
  const { signer } = useEtherWalletStore();
  const [deployedCount, setDeployedCount] = useState(0);
  const counterRef = useRef(null);
  const introduceRef = useRef(null);
  const guideRef = useRef(null);
  const isCounterInView = useInView(counterRef, { once: true });
  const isIntroduceInView = useInView(introduceRef, { once: true });
  const isGuideInView = useInView(guideRef, { once: true });
  const { data, isFetching } = useGetContractList();
  const [wallet] = useWallets();
  const { mutate } = useCreateDeployer();

  const { open: openNFTConstructor, ModalComponent: NFTConstructorModal } = useModal({
    modalBody: NFTConstructorModalBody,
    form: 'contract-info-form',
    submitText: 'Deploy now',
    iconSubmit: <Icon icon="grommet-icons:deploy" fontSize={16} className="mr-1" />,
  });
  const { open: openContractConstructor, ModalComponent: ContractConstructorModal } = useModal({
    modalBody: ContractConstructorModalBody,
    form: 'contract-info-form',
    submitText: 'Deploy now',
    iconSubmit: <Icon icon="grommet-icons:deploy" fontSize={16} className="mr-1" />,
  });
  const { open: openDeployResult, ModalComponent: DeployResultModal } = useModal({
    modalBody: DeployResultModalBody,
    form: 'contract-info-form',
    displayFooter: false,
  });

  useEffect(() => {
    if (isCounterInView) {
      // TODO: Remove 1000
      setDeployedCount((data?.data?.countAll || 0) + 1000);
    }
  }, [isCounterInView, data]);

  const handleOpenDeployResult = useCallback(
    (result: DeployContractResult) => {
      openDeployResult({
        title: 'Deployment Result',
        data: result,
      });

      mutate({
        address: wallet.accounts?.[0]?.address,
        blockHash: result.hash || '',
        contractId: result.contractId,
      });
    },
    [wallet?.accounts, mutate, openDeployResult]
  );

  const handleDeployContract = useCallback(
    async (contract: ContractCardInfo) => {
      const compiled = compiledList[contract.code];

      if (contract.type === TypeContract.NFT) {
        openNFTConstructor({
          title: 'NFT Information',
          data: {
            contract,
            compiled,
            handleOpenDeployResult,
          },
        });
        return;
      }

      if (contract.type === TypeContract.HELLO_SCROLL) {
        openContractConstructor({
          title: 'Smart Contract Information',
          data: {
            contract,
            compiled,
            handleOpenDeployResult,
          },
        });
        return;
      }

      // Deploy smart contract with abi, bytecode
      const factory = new ContractFactory(compiled.abi, compiled.bytecode, signer);
      const newContract = await factory.deploy();

      const result = await newContract.deploymentTransaction()?.wait();
      handleOpenDeployResult({
        address: result?.contractAddress || '',
        hash: result?.blockHash || '',
        title: contract.title,
        contractId: contract.id,
      });
    },

    [openNFTConstructor, handleOpenDeployResult, openContractConstructor, compiledList, signer]
  );

  return (
    <>
      <div className="mx-auto mt-20">
        <div className="text-center mx-auto w-[75%]">
          <Typography className="md:text-5xl text-3xl font-bold">Scroll Origins NFT</Typography>
          <Typography className="text-base md:text-xl font-semibold mt-1.5">
            <Typography.Link
              href="https://scroll.io/developer-nft/check-eligibility"
              target="_blank"
              className="text-xl font-semibold"
            >
              Scroll Origins NFT{' '}
            </Typography.Link>
            celebrates the first builders on the Scroll mainnet. To qualify for the Scroll Origins,
            you must deploy a project before Dec 10, 2023.{' '}
            <span className="text-primary cursor-default">ScrollGate</span> provide ways to complete
            tasks in one click.
          </Typography>

          <Typography className="phase">Phase 1: Quintic - Nov 10, 2023</Typography>
        </div>

        <div className="text-center mt-4">
          <Countdown date={new Date('2023-11-10T06:00:00Z')} renderer={renderer} />
        </div>

        <Row gutter={[16, 16]} className="mt-6">
          {data?.data?.contracts.map((item) => (
            <Col xl={6} md={12} xs={24}>
              <ContractCard
                info={item}
                handleDeploy={handleDeployContract}
                isLoadingData={isFetching}
              />
            </Col>
          ))}
        </Row>

        <div className="w-[80%] mx-auto mt-32">
          <Row gutter={[16, 16]}>
            <Col md={12} ref={introduceRef}>
              <img
                src={introduce}
                alt="introduce"
                className="w-full"
                style={{
                  transform: isIntroduceInView ? 'none' : 'translate(-50px, 250px)',
                  opacity: isIntroduceInView ? 1 : 0,
                  transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s',
                }}
              />
            </Col>

            <Col md={12} className="flex items-center">
              <div
                style={{
                  transform: isIntroduceInView ? 'none' : 'translate(50px, 250px)',
                  opacity: isIntroduceInView ? 1 : 0,
                  transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s',
                }}
              >
                <Typography className="text-3xl font-bold">Introduce</Typography>
                <Typography className="text-lg mt-4 font-medium">
                  Our website will guide you through each step, ensuring you complete the campaign
                  accurately. We have simplified the process to save you time and effort.
                </Typography>
                <Typography className="text-lg font-medium">
                  By leveraging this supportive our platform, users can easily participate in the
                  campaign, contributing to the scaling of Scroll network while earning the esteemed
                  soulbound Scroll Origins NFT.
                </Typography>
              </div>
            </Col>

            <Col md={12} className="mt-20" ref={guideRef}>
              <img
                src={guide}
                alt="guide"
                className="w-full"
                style={{
                  transform: isGuideInView ? 'none' : 'translate(-50px, 250px)',
                  opacity: isGuideInView ? 1 : 0,
                  transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s',
                }}
              />
            </Col>

            <Col md={12} className="flex items-center">
              <div
                style={{
                  transform: isGuideInView ? 'none' : 'translate(50px, 250px)',
                  opacity: isGuideInView ? 1 : 0,
                  transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s',
                }}
              >
                <Typography className="text-3xl font-bold">Usage Guide</Typography>
                <Steps direction="vertical" items={STEPS} className="mt-5" />
              </div>
            </Col>

            <Col span={24} className="text-center mt-20 mb-10" ref={counterRef}>
              <Statistic
                className="custom-statistic"
                title="Total Contracts Deployed"
                value={deployedCount}
                formatter={formatter}
              />
            </Col>
          </Row>
        </div>

        <Divider className="dark:bg-slate-600 bg-slate-900" />
      </div>

      <NFTConstructorModal />
      <DeployResultModal />
      <ContractConstructorModal />
    </>
  );
}
