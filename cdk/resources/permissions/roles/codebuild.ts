import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket): iam.Role => {
  const role = new iam.Role(parent, 'CodeBuildBaseRole', {
    assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com')
  })

  // new iam.CfnManagedPolicy(parent, 'CodeBuildBasePolicy', {
  //   policyDocument: {
  //     statement: [
  //       {
  //         action: [
  //           'logs:CreateLogGroup',
  //           'logs:CreateLogStream',
  //           'logs:PutLogEvents'
  //         ],
  //         effect: 'Allow',
  //         resources: ['*']
  //       },
  //       {
  //         action: [
  //           'cloudformation:ValidateTemplate'
  //         ],
  //         effect: 'Allow',
  //         resources: ['*']
  //       },
  //       {
  //         action: [
  //           'sts:AssumeRole',
  //           'iam:GetUser'
  //         ],
  //         effect: 'Allow',
  //         resources: ['*']
  //       },
  //       {
  //         action: [
  //           'kms:*'
  //         ],
  //         effect: 'Allow',
  //         resources: ['*']
  //       },
  //       {
  //         action: [
  //           's3:Get*',
  //           's3:List*',
  //           's3:PutObject',
  //           's3:PutObjectAcl',
  //           's3:DeleteObject'
  //         ],
  //         effect: 'Allow',
  //         resources: [
  //           `${buildArtifactsBucket.bucketArn}/*`,
  //           buildArtifactsBucket.bucketArn
  //         ]
  //       }
  //     ]
  //   },
  //   roles: [role.roleArn]
  // })

  return role
}
