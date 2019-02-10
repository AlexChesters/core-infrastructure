import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct) => new ec2.VpcNetwork(parent, 'VPC', {
  cidr: '10.0.0.0/21',
  natGateways: 0,
  subnetConfiguration: [
    {
      cidrMask: 24,
      name: 'public',
      subnetType: ec2.SubnetType.Public
    }
  ]
})
