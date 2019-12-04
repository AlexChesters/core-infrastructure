import * as cdk from '@aws-cdk/core'

import Storage from './resources/storage'
import VPC from './resources/vpc'

export default class Stack extends cdk.Stack {
  constructor (parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props)

    const bucket = Storage(this)
    const vpc = VPC(this)

    new cdk.CfnOutput(this, 'BuildArtifactsBucketOutput', {
      description: 'S3 bucket to use for CI artifacts',
      exportName: `${this.stackName}-build-artifacts-bucket`,
      value: bucket.bucketName
    })

    new cdk.CfnOutput(this, 'VPCId', {
      description: 'ID of the VPC',
      exportName: `${this.stackName}-vpc-id`,
      value: vpc.vpcId
    })

    new cdk.CfnOutput(this, 'PublicSubnetOneId', {
      description: 'ID of public subnet one',
      exportName: `${this.stackName}-public-subnet-one-id`,
      value: vpc.publicSubnets[0].subnetId
    })

    new cdk.CfnOutput(this, 'PublicSubnetTwoId', {
      description: 'ID of public subnet two',
      exportName: `${this.stackName}-public-subnet-two-id`,
      value: vpc.publicSubnets[1].subnetId
    })
  }
}
