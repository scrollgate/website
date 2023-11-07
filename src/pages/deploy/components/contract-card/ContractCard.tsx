import React, { useState } from 'react';

import { Button, Skeleton, Tag, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import { TypeContract } from '@root/constants';
import { ContractCardProps } from '@root/interfaces';
import { useEtherWalletStore } from '@root/services/store';

import './contract-card.scss';

const ContractCard = ({ info, handleDeploy, isLoadingData }: ContractCardProps) => {
  const { provider, isSupportedChain } = useEtherWalletStore();
  const { description, title, image, price } = info;
  const isDisabled = !provider || !isSupportedChain;
  const [isLoading, setIsLoading] = useState(false);
  const isCheapFee = ![TypeContract.NFT, TypeContract.TOKEN].includes(info.type as TypeContract);

  const handleDeployContract = async () => {
    try {
      setIsLoading(true);
      await handleDeploy(info);
      setIsLoading(false);
    } catch (error: any) {
      if (error.action === 'estimateGas') {
        toast.error('Insufficient balance');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="card-nft">
      <div className="main">
        <div className="content">
          {isLoadingData ? (
            <Skeleton.Image className="image" active />
          ) : (
            <img className="image" src={image} alt="NFT" />
          )}

          {isLoadingData ? (
            <Skeleton className="mt-8" paragraph={{ rows: 4 }} />
          ) : (
            <>
              <Typography.Title level={4} className="mt-3">
                {title}
              </Typography.Title>

              <Typography.Title
                className="mt-4 description"
                ellipsis={{ rows: 3, tooltip: description }}
                level={5}
              >
                {description}
              </Typography.Title>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Typography className="price">
                    <p>Price:</p>
                    <p className="ml-1">{price || 'Free'}</p>
                  </Typography>
                  <Typography className="font-semibold ">
                    Deployed: {info.deployersCount}
                  </Typography>
                </div>
                {isCheapFee && <Tag color="volcano">Low Fee 🔥</Tag>}
              </div>
            </>
          )}
        </div>

        <Tooltip
          title={isDisabled ? 'Please connect wallet and switch Scroll network' : ''}
          className="button-deploy"
        >
          <Button
            className={clsx('mt-6', { 'button-high-light': !isDisabled && !isLoadingData })}
            type="primary"
            disabled={isDisabled || isLoadingData}
            loading={isLoading}
            onClick={handleDeployContract}
          >
            Deploy Smart Contract Now
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default React.memo(ContractCard);
