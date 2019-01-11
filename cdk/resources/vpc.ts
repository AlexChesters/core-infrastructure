import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct) => {
  return new ec2.VpcNetwork(parent, 'VPC')
}
