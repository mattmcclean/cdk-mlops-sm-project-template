import * as cdk from '@aws-cdk/core';
import * as cfn_inc from '@aws-cdk/cloudformation-include';
import { Asset } from '@aws-cdk/aws-s3-assets';
import * as path from 'path';

export class MLOpsServiceCatalogueProductStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
        super(scope, id, props);

        const template = new cfn_inc.CfnInclude(this, 'Template', { 
            templateFile: './src/product-template.yaml',
        });
    }
}