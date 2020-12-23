#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MLOpsServiceCataloguePortfolioStack } from '../lib/mlops-sc-portfolio-stack';
import { MLOpsServiceCatalogueProductStack } from '../lib/mlops-sc-product-stack';

const app = new cdk.App();
new MLOpsServiceCataloguePortfolioStack(app, 'ServiceCataloguePortfolioStack', {
    constraintRole: 'arn:aws:iam::934676248949:role/AmazonSageMakerServiceCatalogProductsLaunchRole',
    accessRole: 'arn:aws:iam::934676248949:role/CdkSagemakerStudioVpcStack-SmStudioRoleF472E9A4-1V95WF23IQ4ZB',
});
new MLOpsServiceCatalogueProductStack(app, 'ServiceCatalogueProductStack');