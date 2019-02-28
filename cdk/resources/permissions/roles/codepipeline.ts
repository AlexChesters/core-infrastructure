import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket): iam.Role => {
  const role = new iam.Role(parent, 'CodePipelineBaseRole', {
    assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com')
  })

  const cloudFormationStatement = new iam
    .PolicyStatement()
    .addActions(
      'cloudformation:CreateChangeSet',
      'cloudformation:DescribeChangeSet',
      'cloudformation:ExecuteChangeSet',
      'cloudformation:DeleteChangeSet',
      'cloudformation:DescribeStacks'
    )
    .addAllResources()
    .allow()

  const roleStatement = new iam
    .PolicyStatement()
    .addActions('iam:GetRole', 'iam:PassRole')
    .addAllResources()
    .allow()

  const codeBuildPolicy = new iam
    .PolicyStatement()
    .addActions('codebuild:StartBuild', 'codebuild:BatchGetBuilds')
    .addAllResources()
    .allow()

  const buildArtifactsBucketStatement = new iam
    .PolicyStatement()
    .addActions(
      's3:Get*',
      's3:List*',
      's3:PutObject',
      's3:PutObjectAcl',
      's3:DeleteObject'
    )
    .addResources(
      `${buildArtifactsBucket.bucketArn}/*`,
      buildArtifactsBucket.bucketArn
    )
    .allow()

  const kmsStatement = new iam
    .PolicyStatement()
    .addAction('kms:*')
    .addAllResources()
    .allow()

  new iam.Policy(parent, 'CodePipelineBasePolicy', {
    roles: [role],
    statements: [
      cloudFormationStatement,
      roleStatement,
      codeBuildPolicy,
      kmsStatement,
      buildArtifactsBucketStatement
    ]
  })

  return role
}
