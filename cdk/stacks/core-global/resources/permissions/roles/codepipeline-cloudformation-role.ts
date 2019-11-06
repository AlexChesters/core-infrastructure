import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct, executionRole: iam.Role): iam.Role => {
  const role = new iam.Role(parent, 'CodePipelineCloudFormationRole', {
    assumedBy: new iam.CompositePrincipal(
      new iam.ArnPrincipal(executionRole.roleArn),
      new iam.ServicePrincipal('cloudformation.amazonaws.com')
    )
  })

  const adminStatement = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['*'],
    resources: ['*']
  })

  new iam.Policy(parent, 'CodePipelineCloudFormationPolicy', {
    roles: [role],
    statements: [adminStatement]
  })

  return role
}
