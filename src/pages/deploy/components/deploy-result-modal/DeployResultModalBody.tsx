import { Button, Typography } from 'antd';

import fireworks from '@assets/images/fireworks.gif';
import { SCROLL_SCAN } from '@root/constants';
import { DeployContractResult, ModalBodyProps } from '@root/interfaces';

export default function DeployResultModalBody({ data }: ModalBodyProps) {
  const modalData = data as DeployContractResult;

  const handleCheckEligible = () => {
    window.open('https://scroll.io/developer-nft/check-eligibility', '_blank');
  };

  return (
    <>
      <div className="text-center">
        <img src={fireworks} alt="success" className="w-[50%]" />
      </div>

      <div className="w-[80%] mx-auto text-center ">
        <Typography.Text className="text-lg mt-4 font-bold italic default-text-high-light">
          Congratulations. You have deployed {modalData.title} smart contract to the Scroll network
        </Typography.Text>
        <span className="text-lg"> 🎉🎉🎉</span>
      </div>

      <Typography className="text-base font-medium mt-4">Transaction hash</Typography>
      <Typography.Link
        className="text-base font-medium text-primary italic"
        href={`${SCROLL_SCAN}/tx/${modalData.hash}`}
        target="_blank"
      >
        {modalData.hash}
      </Typography.Link>

      <Typography className="text-base font-medium mt-2">Smart Contract Address: </Typography>
      <Typography.Link
        href={`${SCROLL_SCAN}/address/${modalData.address}`}
        className="text-base font-medium text-primary italic"
        target="_blank"
      >
        {modalData.address}
      </Typography.Link>

      <div className="mt-8 text-center">
        <Button type="primary" onClick={handleCheckEligible}>
          Check Scroll Origins NFT Eligibility
        </Button>
      </div>
    </>
  );
}
