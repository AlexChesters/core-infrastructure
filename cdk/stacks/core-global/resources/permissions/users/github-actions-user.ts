import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'

export default (parent: cdk.Construct): iam.User => {
  const statement = new iam.PolicyStatement({ effect: iam.Effect.ALLOW })

  statement.addActions('sts:AssumeRole', 'sts:TagSession')
  statement.addResources('arn:aws:iam::008356366354:role/projects-live-bucket-BucketUploadRole-1USRJUF87S00F')

  return new iam.User(parent, 'GitHubActionsUser', {
    userName: 'github-actions',
    managedPolicies: [
      new iam.ManagedPolicy(parent, 'GitHubActionsManagedPolicy', {
        managedPolicyName: 'github-actions-managed-policy',
        statements: [
          statement
        ]
      })
    ]
  })
}
