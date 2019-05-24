import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct, buildArtifactsBucketArn: string, role: iam.Role): iam.CfnManagedPolicy => {
  return new iam.CfnManagedPolicy(parent, 'CodePipelineBaseManagedPolicy', {
    policyDocument: {
      Statement: [
        {
          Action: [
            'cloudformation:CreateChangeSet',
            'cloudformation:DescribeChangeSet',
            'cloudformation:ExecuteChangeSet',
            'cloudformation:DeleteChangeSet',
            'cloudformation:DescribeStacks'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'CloudformationStatement'
        },
        {
          Action: [
            'iam:GetRole',
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
            'codebuild:StartBuild',
            'codebuild:BatchGetBuilds'
          ],
          Effect: 'Allow',
          Resource: [
            '*'
          ],
          Sid: 'CodeBuildStatement'
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
            `${buildArtifactsBucketArn}/*`,
            buildArtifactsBucketArn
          ],
          Sid: 'S3Statement'
        }
      ],
      Version: '2012-10-17'
    },
    roles: [role.roleName]
  })
}
