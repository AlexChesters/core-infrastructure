import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct): iam.Role => {
  const role = new iam.Role(parent, 'CodePipelineCloudFormationRole', {
    assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com')
  })

  const adminStatement = new iam
    .PolicyStatement()
    .addActions('*')
    .addAllResources()
    .allow()

  new iam.Policy(parent, 'CodePipelineCloudFormationPolicy', {
    roles: [role],
    statements: [adminStatement]
  })

  return role
}
