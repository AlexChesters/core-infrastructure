import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): iam.User => {
  const user = new iam.User(parent, 'GitHubActionsUser')

  const adminStatement = new iam.PolicyStatement({
    actions: ['*'],
    effect: iam.Effect.ALLOW,
    resources: ['*']
  })

  new iam.Policy(parent, 'GitHubActionsPolicy', {
    users: [user],
    statements: [adminStatement]
  })

  return user
}
