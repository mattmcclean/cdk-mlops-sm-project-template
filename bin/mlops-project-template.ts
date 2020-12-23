#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MLOpsServiceCataloguePortfolioStack } from '../lib/mlops-sc-portfolio-stack';

const app = new cdk.App();
new MLOpsServiceCataloguePortfolioStack(app, 'ServiceCataloguePortfolioStack');