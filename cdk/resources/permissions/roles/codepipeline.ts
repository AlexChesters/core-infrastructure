import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

import buildArtifactsBucketStatement from '../statements/build-artifacts-bucket-statement'
import kmsStatement from '../statements/kms'

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

  new iam.Policy(parent, 'CodePipelineBasePolicy', {
    roles: [role],
    statements: [
      cloudFormationStatement,
      roleStatement,
      codeBuildPolicy,
      kmsStatement(),
      buildArtifactsBucketStatement(buildArtifactsBucket)
    ]
  })

  return role
}
