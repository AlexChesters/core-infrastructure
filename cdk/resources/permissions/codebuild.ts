import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket): iam.Role => {
  const role = new iam.Role(parent, 'CodeBuildBaseRole', {
    assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com')
  })

  const cloudWatchLogsStatement = new iam
    .PolicyStatement()
    .addActions(
      'logs:CreateLogGroup',
      'logs:CreateLogStream',
      'logs:PutLogEvents'
    )
    .addAllResources()
    .allow()

  const cloudFormationStatement = new iam
    .PolicyStatement()
    .addAction('cloudformation:ValidateTemplate')
    .addAllResources()
    .allow()

  const identityStatement = new iam
    .PolicyStatement()
    .addActions('sts:AssumeRole', 'iam:GetUser')
    .addAllResources()
    .allow()

  const kmsStatement = new iam
    .PolicyStatement()
    .addAction('kms:*')
    .addAllResources()
    .allow()

  const s3Statement = new iam
    .PolicyStatement()
    .addActions(
      's3:Get*',
      's3:List*',
      's3:PutObject',
      's3:PutObjectAcl', 's3:DeleteObject'
    )
    .addResources(
      `${buildArtifactsBucket.bucketArn}/*`,
      buildArtifactsBucket.bucketArn
    )
    .allow()

  new iam.Policy(parent, 'CloudWatchLogsPolicy', {
    roles: [role],
    statements: [
      cloudWatchLogsStatement,
      cloudFormationStatement,
      identityStatement,
      kmsStatement,
      s3Statement
    ]
  })

  return role
}
