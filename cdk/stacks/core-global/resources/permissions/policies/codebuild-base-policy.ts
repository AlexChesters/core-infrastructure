import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket, role: iam.Role): iam.CfnManagedPolicy => {
  return new iam.CfnManagedPolicy(parent, 'CodeBuildBaseManagedPolicy', {
    policyDocument: {
      Statement: [
        {
          Action: [
            'cloudformation:ValidateTemplate'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'CloudformationStatement'
        },
        {
          Action: [
            'logs:CreateLogGroup',
            'logs:CreateLogStream',
            'logs:PutLogEvents'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'CloudWatchLogsStatement'
        },
        {
          Action: [
            'sts:AssumeRole',
            'iam:GetUser'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'IAMStatement'
        },
        {
          Action: [
            'ssm:GetParameters'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'SSMStatement'
        },
        {
          Action: [
            'kms:*'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'KMSStatement'
        },
        {
          Action: [
            's3:Get*',
            's3:List*',
            's3:PutObject',
            's3:PutObjectAcl',
            's3:DeleteObject'
          ],
          Effect: 'Allow',
          Resource: [
            `${buildArtifactsBucket.bucketArn}/*`,
            buildArtifactsBucket.bucketArn
          ],
          Sid: 'S3Statement'
        }
      ],
      Version: '2012-10-17'
    },
    roles: [role.roleName]
  })
}
