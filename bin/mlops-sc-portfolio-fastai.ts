#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MlopsScPortfolioFastaiStack } from '../lib/mlops-sc-portfolio-fastai-stack';

const app = new cdk.App();
new MlopsScPortfolioFastaiStack(app, 'MlopsScPortfolioFastaiStack');
