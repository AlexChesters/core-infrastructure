import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): iam.CfnManagedPolicy => {
  return new iam.CfnManagedPolicy(parent, 'PackerManagedPolicy', {
    policyDocument: {
      Statement: [
        {
          Action: [
            'ec2:AttachVolume',
            'ec2:AuthorizeSecurityGroupIngress',
            'ec2:CopyImage',
            'ec2:CreateImage',
            'ec2:CreateKeypair',
            'ec2:CreateSecurityGroup',
            'ec2:CreateSnapshot',
            'ec2:CreateTags',
            'ec2:CreateVolume',
            'ec2:DeleteKeyPair',
            'ec2:DeleteSecurityGroup',
            'ec2:DeleteSnapshot',
            'ec2:DeleteVolume',
            'ec2:DeregisterImage',
            'ec2:DescribeImageAttribute',
            'ec2:DescribeImages',
            'ec2:DescribeInstances',
            'ec2:DescribeRegions',
            'ec2:DescribeSecurityGroups',
            'ec2:DescribeSnapshots',
            'ec2:DescribeSubnets',
            'ec2:DescribeTags',
            'ec2:DescribeVolumes',
            'ec2:DetachVolume',
            'ec2:GetPasswordData',
            'ec2:ModifyImageAttribute',
            'ec2:ModifyInstanceAttribute',
            'ec2:ModifySnapshotAttribute',
            'ec2:RegisterImage',
            'ec2:RunInstances',
            'ec2:StopInstances',
            'ec2:TerminateInstances'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'EC2Statement'
        }
      ],
      Version: '2012-10-17'
    }
  })
}
