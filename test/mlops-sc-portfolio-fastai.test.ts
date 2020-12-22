import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as MlopsScPortfolioFastai from '../lib/mlops-sc-portfolio-fastai-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MlopsScPortfolioFastai.MlopsScPortfolioFastaiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
