import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

import buildArtifactsBucketStatement from '../statements/build-artifacts-bucket-statement'
import kmsStatement from '../statements/kms'

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

  new iam.Policy(parent, 'CodeBuildBasePolicy', {
    roles: [role],
    statements: [
      cloudWatchLogsStatement,
      cloudFormationStatement,
      identityStatement,
      kmsStatement(),
      buildArtifactsBucketStatement(buildArtifactsBucket)
    ]
  })

  return role
}
