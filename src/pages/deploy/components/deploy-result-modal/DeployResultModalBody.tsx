import { Button, Col, Row, Typography } from 'antd';
import { Follow, Share } from 'react-twitter-widgets';

import fireworks from '@assets/images/fireworks.gif';
import { SCROLL_ELIGIBILITY, SCROLL_SCAN } from '@root/constants';
import { DeployContractResult, ModalBodyProps } from '@root/interfaces';

export default function DeployResultModalBody({ data }: ModalBodyProps) {
  const modalData = data as DeployContractResult;

  const handleCheckEligible = () => {
    window.open(SCROLL_ELIGIBILITY, '_blank');
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col sm={12} className="text-center">
          <img src={fireworks} alt="success" className="w-full" />
        </Col>

        <Col sm={12} className="flex items-center justify-center w-full">
          <div className="text-center">
            <Typography>Would you like share it with your fiends?</Typography>

            <div className="mt-2 h-10">
              <Share
                options={{
                  size: 'large',
                  text: 'I just deployed smart contract to the Scroll network at ',
                  via: 'ScrollGate',
                }}
                url="https://scrollgate.pro"
              />
            </div>

            <Typography>Would you like to know about new smart contract?</Typography>

            <div className="mt-2  h-10">
              <Follow username="ScrollGate" options={{ size: 'large' }} />
            </div>
          </div>
        </Col>
      </Row>

      <div className="w-[80%] mx-auto text-center mt-4">
        <Typography.Text className="text-lg mt-4 font-bold italic default-text-high-light">
          Congratulations. You have deployed {modalData.title} smart contract to the Scroll network
        </Typography.Text>
        <span className="text-lg"> 🎉🎉🎉</span>
      </div>

      <Typography className="text-base font-medium mt-4">Transaction hash</Typography>
      <Typography.Link
        className="font-medium text-primary italic"
        href={`${SCROLL_SCAN}/tx/${modalData.hash}`}
        target="_blank"
      >
        {modalData.hash}
      </Typography.Link>

      <Typography className="text-base font-medium mt-2">Smart Contract Address: </Typography>
      <Typography.Link
        href={`${SCROLL_SCAN}/address/${modalData.address}`}
        className="font-medium text-primary italic"
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
