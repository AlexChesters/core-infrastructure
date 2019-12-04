import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): ec2.Vpc => {
  return new ec2.Vpc(
    parent,
    'vpc',
    {
      cidr: '10.0.0.0/21',
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC
        }
      ]
    }
  )
}
