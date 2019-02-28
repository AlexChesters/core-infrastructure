import * as iam from '@aws-cdk/aws-iam'

export default () => new iam
  .PolicyStatement()
  .addAction('kms:*')
  .addAllResources()
  .allow()
