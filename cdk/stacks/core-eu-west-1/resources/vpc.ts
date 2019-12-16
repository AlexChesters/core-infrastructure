import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): ec2.Vpc => {
  const vpc = new ec2.Vpc(
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

  new ec2.CfnVPCCidrBlock(
    parent,
    'vpccidrblock',
    {
      amazonProvidedIpv6CidrBlock: true,
      vpcId: vpc.vpcId
    }
  )

  new ec2.CfnSubnetCidrBlock(
    parent,
    'ipv6cidr1',
    {
      subnetId: vpc.publicSubnets[0].subnetId,
      ipv6CidrBlock: '2a05:d018:979:3c00::/64'
    }
  )
  new ec2.CfnSubnetCidrBlock(
    parent,
    'ipv6cidr2',
    {
      subnetId: vpc.publicSubnets[1].subnetId,
      ipv6CidrBlock: '2a05:d018:979:3c01::/64'
    }
  )

  return vpc
}
