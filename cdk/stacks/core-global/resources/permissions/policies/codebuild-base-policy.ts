import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct, buildArtifactsBucketArns: string[], role: iam.Role): iam.CfnManagedPolicy => {
  const bucketResources: string[] = []

  buildArtifactsBucketArns.forEach((arn) => {
    bucketResources.push(`${arn}/*`)
    bucketResources.push(arn)
  })

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
            'iam:GetUser',
            'iam:GetInstanceProfile',
            'iam:PassRole'
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
          Resource: bucketResources,
          Sid: 'S3Statement'
        },
        {
          Action: [
            'codebuild:CreateReportGroup',
            'codebuild:CreateReport',
            'codebuild:UpdateReport',
            'codebuild:BatchPutTestCases',
            'codebuild:StartBuild'
          ],
          Effect: 'Allow',
          Resource: '*',
          Sid: 'CodeBuildStatement'
        }
      ],
      Version: '2012-10-17'
    },
    roles: [role.roleName]
  })
}
