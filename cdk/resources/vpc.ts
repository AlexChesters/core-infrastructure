import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct) => new ec2.VpcNetwork(parent, 'VPC')
